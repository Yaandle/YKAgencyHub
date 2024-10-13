import { mutation } from "./_generated/server";

export const migrateUserTypes = mutation({
  async handler(ctx) {
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      if ((user.userType as string) === "Employer") {
        await ctx.db.patch(user._id, { userType: "Business" });
      }
    }
  },
});

