import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { clerkId, email, name } = args;
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      return await ctx.db.patch(existingUser._id, {
        email,
        name,
        updatedAt: Date.now(),
      });
    } else {
      return await ctx.db.insert("users", {
        clerkId,
        email,
        name,
        agencyName: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
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
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, { agencyName: args.agencyName, updatedAt: Date.now() });
    return user._id;
  },
});

export const getUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
  },
});