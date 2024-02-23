import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { getHook, makeNextScene } from "./LLMcalls";

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
    handler: async () => {
        const hook = await getHook()
        console.log("Got Campfire hook: ", hook)
        // const pic_res = await getImage(hook)
        // console.log("Pic Result", pic_res)
        return hook;
    }
})

export const saveNewScene = mutation({
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
    handler: async (ctx) => {
        return await ctx.db.query("scenes").collect()
    }
})

export const getCurrentScene = query({
    args: {},
    handler: async (ctx) => {
        return (await ctx.db.query("scenes").collect())?.at(-1)
    }
})

export const getSceneContributions = query({
    args: {},
    handler: async (ctx) => {
        const allContributions = await ctx.db.query("contributions").collect()
        const currentScene = (await ctx.db.query("scenes").collect()).at(-1)
        return allContributions.filter(c => c.scene_id === currentScene._id).map(c => c.contribution)
    }
})

export const makeNewSceneFromContributions = action({
    args: {},
    handler: async (ctx) => {
        const currentScene = (await ctx.runQuery(api.campingFunctions.getCurrentScene)).scene
        const contributions = await ctx.runQuery(api.campingFunctions.getSceneContributions)
        const newScene = await makeNextScene(currentScene, contributions)
        await ctx.runMutation(api.campingFunctions.saveNewScene, {scene: newScene})
    }
})
