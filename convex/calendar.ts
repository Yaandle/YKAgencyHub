import { v } from "convex/values";
import { query } from "./_generated/server";

export const getMonthlyJobs = query({
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
    const startOfMonth = new Date(year, month - 1, 1).getTime();
    const endOfMonth = new Date(year, month, 0).getTime();

    const jobs = await ctx.db
      .query("jobs")
      .filter((q) => 
        q.and(
          q.eq(q.field("createdBy"), user._id),
          q.or(
            q.and(
              q.gte(q.field("startDate"), startOfMonth),
              q.lte(q.field("startDate"), endOfMonth)
            ),
            q.and(
              q.gte(q.field("endDate"), startOfMonth),
              q.lte(q.field("endDate"), endOfMonth)
            ),
            q.and(
              q.lte(q.field("startDate"), startOfMonth),
              q.gte(q.field("endDate"), endOfMonth)
            )
          )
        )
      )
      .collect();

    console.log("Fetched jobs:", jobs); // Debug log

    return jobs;
  },
});