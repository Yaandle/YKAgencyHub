import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createJob = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    assignedUsers: v.array(v.id("users")),
    status: v.union(v.literal("Open"), v.literal("In Progress"), v.literal("Completed")),
    startTime: v.string(),
    finishTime: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    // Calculate dailyHours based on startTime and finishTime
    const startTimeMinutes = timeToMinutes(args.startTime);
    const finishTimeMinutes = timeToMinutes(args.finishTime);
    const dailyHours = (finishTimeMinutes - startTimeMinutes) / 60;

    return await ctx.db.insert("jobs", {
      ...args,
      createdBy: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      dailyHours,
      hours: 0, // Initialize total hours to 0
    });
  },
});

// Helper function to convert time string to minutes
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export const updateJob = mutation({
  args: {
    id: v.id("jobs"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    hours: v.optional(v.number()),
    assignedUsers: v.optional(v.array(v.id("users"))),
    status: v.optional(v.union(v.literal("Open"), v.literal("In Progress"), v.literal("Completed"))),
    startTime: v.optional(v.string()),
    finishTime: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    const job = await ctx.db.get(id);
    if (!job) throw new Error("Job not found");

    // Update daily hours if dates or assigned users have changed
    if (updateFields.startDate || updateFields.endDate || updateFields.assignedUsers) {
      const startDate = updateFields.startDate || job.startDate;
      const endDate = updateFields.endDate || job.endDate;
      const assignedUsers = updateFields.assignedUsers || job.assignedUsers;

      // Delete existing daily hours for this job
      const dailyHoursToDelete = await ctx.db
        .query("dailyHours")
        .filter((q) => q.eq(q.field("jobId"), id))
        .collect();
      
      for (const dailyHour of dailyHoursToDelete) {
        await ctx.db.delete(dailyHour._id);
      }

      // Create new daily hours entries
      for (const userId of assignedUsers) {
        for (let d = startDate; d <= endDate; d += 86400000) {
          await ctx.db.insert("dailyHours", {
            userId,
            jobId: id,
            date: d,
            hours: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }
      }
    }

    return await ctx.db.patch(id, { ...updateFields, updatedAt: Date.now() });
  },
});

export const deleteJob = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const job = await ctx.db.get(args.id);
    if (!job) throw new Error("Job not found");

    // Delete associated daily hours
    const dailyHoursToDelete = await ctx.db
      .query("dailyHours")
      .filter((q) => q.eq(q.field("jobId"), args.id))
      .collect();

    for (const dailyHour of dailyHoursToDelete) {
      await ctx.db.delete(dailyHour._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const completeJob = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const job = await ctx.db.get(args.id);
    if (!job) throw new Error("Job not found");

    await ctx.db.patch(args.id, { status: "Completed", updatedAt: Date.now() });
  },
});

export const getJob = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listJobs = query({
  args: {
    status: v.optional(v.union(v.literal("Open"), v.literal("In Progress"), v.literal("Completed"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    let jobsQuery = ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("createdBy"), user._id));

    if (args.status) {
      jobsQuery = jobsQuery.filter((q) => q.eq(q.field("status"), args.status));
    }

    return await jobsQuery.collect();
  },
});

export const getJobCount = query({
  args: {
    status: v.optional(v.union(v.literal("Open"), v.literal("In Progress"), v.literal("Completed"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    let jobsQuery = ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("createdBy"), user._id));

    if (args.status) {
      jobsQuery = jobsQuery.filter((q) => q.eq(q.field("status"), args.status));
    }

    return await jobsQuery.collect().then(jobs => jobs.length);
  },
});

export const getAssignedJobs = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");
    const allJobs = await ctx.db.query("jobs").collect();
    return allJobs.filter(job => job.assignedUsers.includes(user._id));
  },
});

export const getJobsForDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const queryDate = new Date(args.date);
    const startOfDay = queryDate.setHours(0, 0, 0, 0);
    const endOfDay = queryDate.setHours(23, 59, 59, 999);

    return await ctx.db
      .query('jobs')
      .filter(q => 
        q.and(
          q.gte(q.field('startDate'), startOfDay),
          q.lte(q.field('startDate'), endOfDay)
        )
      )
      .collect();
  },
});
