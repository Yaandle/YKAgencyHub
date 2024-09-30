import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUserCalendarEvents = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { startDate, endDate } = args;
    return await ctx.db
      .query("calendar")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).gte("date", startDate).lte("date", endDate)
      )
      .collect();
  },
});

export const getJobCalendarEvents = query({
  args: {
    jobId: v.id("jobs"),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const { jobId, startDate, endDate } = args;
    return await ctx.db
      .query("calendar")
      .withIndex("by_job", (q) => q.eq("jobId", jobId))
      .filter((q) => q.gte(q.field("date"), startDate) && q.lte(q.field("date"), endDate))
      .collect();
  },
});

export const getUserDailyHours = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { startDate, endDate } = args;
    return await ctx.db
      .query("dailyHours")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).gte("date", startDate).lte("date", endDate)
      )
      .collect();
  },
});

export const getJobDailyHours = query({
  args: {
    jobId: v.id("jobs"),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const { jobId, startDate, endDate } = args;
    return await ctx.db
      .query("dailyHours")
      .withIndex("by_job", (q) => q.eq("jobId", jobId))
      .filter((q) => q.gte(q.field("date"), startDate) && q.lte(q.field("date"), endDate))
      .collect();
  },
});

