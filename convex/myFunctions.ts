import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query function:
export const listIdeas = query({
  // Validators for arguments.
  args: {},

  // Query function implementation.
  handler: async (ctx) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    return await ctx.db.query("ideas").collect();
  },
});

// You can write data to the database via a mutation function:
export const saveIdea = mutation({
  // Validators for arguments.
  args: {
    idea: v.string(),
    random: v.boolean(),
  },

  // Mutation function implementation.
  handler: async (ctx, args) => {

    // Optionally, capture the ID of the newly created document
    const id = await ctx.db.insert("ideas", args);

    // Optionally, return a value from your mutation.
    return id;
  },
});

// // Function to clear all entries in the "ideas" table
// const clearIdeasTable = async (ctx:any) => {
//   try {
//     // Delete all entries from the "ideas" table
//     await ctx.db.query("ideas").delete();

//     // Return success message or handle as needed
//     return "All entries in the 'ideas' table have been cleared.";
//   } catch (error) {
//     // Handle errors that may occur during the database operation
//     console.error("Error clearing ideas table:", error);
//     return "Error clearing ideas table";
//   }
// };

// You can fetch data from and send data to third-party APIs via an action:
export const fetchRandomIdea = action({
  // Validators for arguments.
  args: {},

  // Action implementation.
  handler: async (ctx) => {
    // Use the browser-like `fetch` API to send HTTP requests.
    // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    const response = await fetch("https://appideagenerator.com/call.php");
    const idea = await response.text();

    // Write or query data by running Convex mutations/queries from within an action
    await ctx.runMutation(api.myFunctions.saveIdea, {
      idea: idea.trim(),
      random: true,
    });

    // Optionally, return a value from your action
    return idea;
  },
});
