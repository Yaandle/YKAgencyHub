import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDailyHoursSummary = query({
  args: { 
    startDate: v.number(),
    endDate: v.number()
  },
  handler: async (ctx, args) => {
    const { startDate, endDate } = args;

    const dailyHours = await ctx.db
      .query("dailyHours")
      .filter(q => 
        q.gte(q.field("date"), startDate) &&
        q.lt(q.field("date"), endDate)
      )
      .collect();

    const summary = dailyHours.reduce((acc, entry) => {
      const date = new Date(entry.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { totalHours: 0, jobs: {} };
      }
      acc[date].totalHours += entry.hours;
      if (!acc[date].jobs[entry.jobId]) {
        acc[date].jobs[entry.jobId] = 0;
      }
      acc[date].jobs[entry.jobId] += entry.hours;
      return acc;
    }, {} as { [date: string]: { totalHours: number, jobs: { [jobId: string]: number } } });

    return summary;
  },
});