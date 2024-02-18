import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

export const shareContribution = mutation({
    args: {
        contribution: v.string(),
        scene_id: v.string(),
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("contributions", args)
        return id
    },
});

// export const flushContributions = mutation({
//     args: {},
//     handler: async (ctx) => {
//         const ids = await ctx.db.query("contributions").collect();
//         for (const idChunk of chunk(ids, 100)) {
//             await Promise.all(idChunk.map(id => db.delete(id)))
//         }
//     },
// });

// // Function to clear all entries in the "contributions" table
// export const flushContributions = async (ctx: any) => {
//     try {
//       // Delete all entries from the "contributions" table
//       await ctx.db.query("contributions").delete();
  
//       // Return success message or handle as needed
//       return "All entries in the 'contributions' table have been cleared.";
//     } catch (error) {
//       // Handle errors that may occur during the database operation
//       console.error("Error clearing contributions table:", error);
//       return "Error clearing contributions table";
//     }
//   };

// export const getAllContributions = query({
//     args: {},
//     handler: async (ctx, args) => {
//         const contributions = await ctx.db.query("contributions").collect();
//         return contributions;
//     },
// });

// // export const flushContributions = mutation({
// //     args: {},
// //     handler: async (ctx, args) => {
// //         const contributions = await getAllContributions();
// //         for (contribution of contributions) {
// //             await ctx.db.delete(contribution.id);
// //         }
// //     },
// //   });

// export const getContributionsCount = query({
//     args: {},
//     handler: async (ctx, args) => {
//         const contributions = await ctx.db.query("contributions").collect();
//         return contributions.length;
//     },
// });

// export const deleteTask = mutation({
//     args: { id: v.id("contributions") },
//     handler: async (ctx, args) => {
//       await ctx.db.delete(args.id);
//     },
//   });

//   export const flushContributions = internalMutation(async ({ db }, { cursor, numItems }) => {
//     const data = await db.query("contributions").paginate({ cursor, numItems });
//     const { page, isDone, continueCursor } = data;
//     for (const doc of page) {
//       await deleteTask({ id: doc.id });
//     }
//     return { cursor: continueCursor, isDone };
//   });
  

  export const getScene = query({
    args: {},
    handler: async (ctx) => {
        const scene = await ctx.db.query("scenes").order('desc').first();
        return scene
    }
  });

//   export const getScene = query({
//     args: {},
//     handler: async (ctx) => {
//         const scene_id = await ctx.db.query
//         return scene_id
//     }
//   });

  export const makeNewScene = mutation({
    args: {
        scene: v.string()
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("scenes", args)
        return id
    },
});

// export const makeNewScene = mutation({
//     args: {
//         scene: v.string()
//     },
//     handler: async (ctx, args) => {
//         // Fetch all existing scenes
//         const scenes = await ctx.db.query("scenes").all();

//         // Concatenate all existing scenes with the new scene
//         const allScenes = scenes.map(s => s.scene).join(' ') + ' ' + args.scene;

//         // Insert the concatenated string into the database
//         const id = await ctx.db.insert("scenes", { scene: allScenes });

//         return id;
//     },
// });

// temp function
export const getConcatenatedScenes = query({
    args: {},
    handler: async (ctx) => {
        // Fetch all existing scenes
        const scenes = await ctx.db.query("scenes").collect();

        // Concatenate all existing scenes
        const allScenes = scenes.concat(scenes);
        return allScenes;
    },
});