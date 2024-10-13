import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createCalendarEvent = mutation({
  args: {
    jobId: v.id("jobs"),
    date: v.number(),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { jobId, date, startTime, endTime } = args;
    return await ctx.db.insert("calendar", {
      userId: user._id,
      jobId,
      date,
      startTime,
      endTime,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateCalendarEvent = mutation({
  args: {
    id: v.id("calendar"),
    startTime: v.optional(v.number()),
    endTime: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, startTime, endTime } = args;
    const update: any = { updatedAt: Date.now() };
    if (startTime !== undefined) update.startTime = startTime;
    if (endTime !== undefined) update.endTime = endTime;
    return await ctx.db.patch(id, update);
  },
});

export const deleteCalendarEvent = mutation({
  args: { id: v.id("calendar") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const logDailyHours = mutation({
  args: {
    jobId: v.id("jobs"),
    date: v.number(),
    hours: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { jobId, date, hours } = args;
    return await ctx.db.insert("dailyHours", {
      userId: user._id,
      jobId,
      date,
      hours,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateDailyHours = mutation({
  args: {
    id: v.id("dailyHours"),
    hours: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, hours } = args;
    return await ctx.db.patch(id, { hours, updatedAt: Date.now() });
  },
});

export const updateAgencyName = mutation({
  args: { agencyName: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user.userType !== "Business") {
      throw new Error("Only Business users can have an agency name");
    }

    await ctx.db.patch(user._id, { agencyName: args.agencyName, updatedAt: Date.now() });
    return user._id;
  },
});
