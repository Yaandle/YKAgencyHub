import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createJob = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    assignedUsers: v.array(v.id("users")),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { title, description, startDate, endDate, assignedUsers, status } = args;
    return await ctx.db.insert("jobs", {
      title,
      description,
      startDate,
      endDate,
      createdBy: user._id,
      assignedUsers,
      status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateJob = mutation({
  args: {
    id: v.id("jobs"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    assignedUsers: v.optional(v.array(v.id("users"))),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
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

    // Optional: Check if the user has permission to delete this job
    // if (job.createdBy !== identity.subject) throw new Error("Not authorized");

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

    // Optional: Check if the user has permission to complete this job
    // if (job.createdBy !== identity.subject) throw new Error("Not authorized");

    await ctx.db.patch(args.id, { status: "completed" });
  },
});

export const getJob = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listJobs = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    return await ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("createdBy"), user._id))
      .collect();
  },
});

export const getJobCount = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const jobs = await ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("createdBy"), user._id))
      .collect();

    return jobs.length;
  },
});

