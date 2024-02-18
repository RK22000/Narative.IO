import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import campfire from './assets/summer-campfire.jpg'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'

function Camp() {
    const [storyContribution, setStoryContribution] = useState("")
    const [currentScene_id, setScene_id] = useState("")

    const shareContribution = useMutation(api.campingFunctions.shareContribution);
    // const getConcatenatedScenes = useQuery(api.campingFunctions.getConcatenatedScenes);
    const makeNewScene = useMutation(api.campingFunctions.makeNewScene);
    
    // const currentContributions = useQuery(api.campingFunctions.getContributions);
    // const { data: currentContributions } = useQuery(api.campingFunctions.getContributions, { currentScene_id: currentScene_id });
    // const listContributions = useQuery(api.campingFunctions.listContributions);

    return (
        <>
            <h1 className="text-3xl font-extrabold mt-8 text-center">
                Welcome to the campfire 🔥
            </h1>
            <img src={campfire} width="60%"></img>
            <form>
                <Input
                    type="text"
                    value={storyContribution}
                    onChange={(event) => setStoryContribution(event.target.value)}
                    placeholder="Write your contribution to the story here"
                    />
                <Button
                    type='submit'
                    disabled={!storyContribution}
                    title={
                        storyContribution
                            ? "Share your story with the campfire"
                            : "You must write an extension to the current story first"
                    }
                    onClick={async (e) => {
                        e.preventDefault();
                        await shareContribution({ contribution: storyContribution.trim(), scene_id: currentScene_id,})
                        setStoryContribution("")
                    }}
                    >
                        Share your story
                    </Button>
            </form>
            <form>
                <Button
                    onClick={async (e) => {
                        e.preventDefault();
                        const text = "placeholder five";
                        const currentContributions = await ctx.db
                            .query("contributions")
                            .filter((q) => q.eq(q.field("scene_id"), currentScene_id))
                            .collect();
                        const result = currentContributions.map(a => a.contribution);
                        const str = result.toString();
                        const sceneId = await makeNewScene({ scene: str, });

                        // const currentContributions = await ctx.db
                        //     .query("contributions")
                        //     .filter((q) => q.eq(q.field("scene_id"), currentScene_id))
                        //     .collect();

                        setScene_id(sceneId)
                    }}
                    >
                        Write next scene
                </Button>
            </form>

            <p>
                currentContributions
            </p>

            
        </>
    )

}

export default Camp;