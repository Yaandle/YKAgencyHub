import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    userType: v.union(v.literal("Business"), v.literal("Employee")),
    agencyName: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_created", ["createdAt"]),

  jobs: defineTable({
    title: v.string(),
    description: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    createdBy: v.id("users"),
    hours: v.number(), // Changed from optional to required
    assignedUsers: v.array(v.id("users")),
    status: v.union(v.literal("Open"), v.literal("In Progress"), v.literal("Completed")),
    createdAt: v.number(),
    updatedAt: v.number(),
    startTime: v.string(),
    finishTime: v.string(),
    dailyHours: v.number(),
  })
    .index("by_created_by", ["createdBy"])
    .index("by_assigned_user", ["assignedUsers"])
    .index("by_status", ["status"])
    .index("by_date_range", ["startDate", "endDate"]),

  calendar: defineTable({
    userId: v.id("users"),
    jobId: v.id("jobs"),
    date: v.number(), 
    startTime: v.number(), 
    endTime: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_and_date", ["userId", "date"])
    .index("by_job", ["jobId"])
    .index("by_date", ["date"]),

  dailyHours: defineTable({
    userId: v.string(),
    jobId: v.id("jobs"),
    date: v.number(),
    hours: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_and_date", ["userId", "date"])
    .index("by_job", ["jobId"]),
});
