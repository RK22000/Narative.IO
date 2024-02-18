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
    const flushContributions = useMutation(api.campingFunctions.flushContributions);
    const getConcatenatedScenes = useQuery(api.campingFunctions.getConcatenatedScenes);
    const makeNewScene = useMutation(api.campingFunctions.makeNewScene);

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
                        const text = "placeholder";
                        const sceneId = await makeNewScene({ scene: text, });
                        setScene_id(sceneId)
                    }}
                    >
                        Write next scene
                </Button>
            </form>
        </>
    )

}

export default Camp;