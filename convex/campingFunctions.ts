import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { getHook, getImage } from "./LLMcalls";

export const shareContribution = mutation({
    args: {
        contribution: v.string(),
        scene_id: v.string()
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
        // const pic_res = await getImage(hook)
        // console.log("Pic Result", pic_res)
        return hook;
    }
})

export const makeNewScene = mutation({
    args: {
        scene: v.string()
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("scenes", args)
        return id
    },
});

export const getAllScene = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db.query("scenes").collect()
    }
})

export const getSceneContributions = query({
    args: {},
    handler: async (ctx, args) => {
        const allContributions = await ctx.db.query("contributions").collect()
        const currentScene = (await ctx.db.query("scenes").collect()).at(-1)
        return allContributions.filter(c => c.scene_id === currentScene._id).map(c => c.contribution)
    }
})
