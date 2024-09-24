import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMonthlyCalendar = query({
  args: {
    year: v.number(),
    month: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { year, month } = args;
    const startDate = new Date(year, month, 1).getTime();
    const endDate = new Date(year, month + 1, 0).getTime();

    const events = await ctx.db
      .query("calendar")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).gte("date", startDate).lte("date", endDate)
      )
      .collect();

    return events;
  },
});

export const getWeeklyCalendar = query({
  args: {
    startDate: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { startDate } = args;
    const endDate = startDate + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    const events = await ctx.db
      .query("calendar")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).gte("date", startDate).lt("date", endDate)
      )
      .collect();

    return events;
  },
});

export const getDailyCalendar = query({
  args: {
    date: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const { date } = args;
    const nextDay = date + 24 * 60 * 60 * 1000; // Next day in milliseconds

    const events = await ctx.db
      .query("calendar")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).gte("date", date).lt("date", nextDay)
      )
      .collect();

    return events;
  },
});