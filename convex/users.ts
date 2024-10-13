import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    userType: v.union(v.literal("Business"), v.literal("Employee")),
    agencyName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { clerkId, email, name, userType, agencyName } = args;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      return await ctx.db.patch(existingUser._id, {
        email,
        name,
        userType,
        agencyName,
        updatedAt: Date.now(),
      });
    } else {
      return await ctx.db.insert("users", {
        clerkId,
        email,
        name,
        userType,
        agencyName,
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
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const setUserType = mutation({
  args: { userType: v.union(v.literal("Business"), v.literal("Employee")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const clerkId = identity.subject;
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { userType: args.userType, updatedAt: Date.now() });
    
    // Update Clerk public metadata
    await clerkClient.users.updateUser(clerkId, {
      publicMetadata: { userType: args.userType },
    });

    return { success: true };
  },
});
