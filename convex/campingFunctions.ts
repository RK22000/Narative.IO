import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

export const shareContribution = mutation({
    args: {
        contribution: v.string()
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("contributions", args)
        return id
    },
})