import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { getHook } from "./LLMcalls";

export const shareContribution = mutation({
    args: {
        contribution: v.string()
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("contributions", args)
        return id
    },
})

export const pullStoryHook = action({
    args: {},
    handler: async (ctx, args) => {
        const hook = await getHook()
        console.log("Got Campfire hook: ", hook)
    }
})
