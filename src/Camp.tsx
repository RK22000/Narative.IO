import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import campfire from './assets/summer-campfire.jpg'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'

function Camp() {
    const [storyContribution, setStoryContribution] = useState("");
    const [sceneDescription, setSceneDescription] = useState("This is a big scene description");

    const shareContribution = useMutation(api.campingFunctions.shareContribution);
    const getTheHook = useAction(api.campingFunctions.pullStoryHook);
    const makeNewScene = useMutation(api.campingFunctions.makeNewScene);
    const scenes = useQuery(api.campingFunctions.getAllScene);
    const getCurrentScene = ()=>scenes?.at(-1)
    const currentContributions = useQuery(api.campingFunctions.getSceneContributions);

    return (
        <div style={{height: "100%", width:"100%", overflow:"clip"}}>
            <p className="text-3xl font-extrabold mt-8 text-center">
                Welcome to the campfire 🔥
            </p>

            <div style={{display: 'flex', }}>
                <div style={{width: "60%", position: 'relative'}}>
                    <img src={campfire} style={{borderRadius:10}}></img>
                    <p style={{
                        position: "absolute", 
                        top:"50%", transform:"translate(0%, -50%)", 
                        // marginBottom:"60px",
                        backgroundColor: "rgba(0,0,0,0.7)"
                        }}>
                        {getCurrentScene()?.scene}
                        
                    </p>
                </div>
                <form style={{display: "flex", flexDirection:"column", width:"40%"}}>
                    <textarea
                        style={{height:"100%", backgroundColor:"rgba(255,255,255,0.01)", borderRadius:10}}
                        // type="text"
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
                            if (scenes?.length === 0) {
                                await makeNewScene({scene: ""})
                            }
                            await shareContribution({ contribution: storyContribution.trim(), scene_id: getCurrentScene()?._id})
                            setStoryContribution("")
                        }}
                        >
                            Share your story
                        </Button>
                </form>
            </div>
            



            <Button
                onClick={async (e) => {
                    const hook = await getTheHook()
                    console.log("got hook", hook)
                    setSceneDescription(hook)  // Maybe comment this out
                    await makeNewScene({scene: hook})

                }}
            >
                Get the hook
            </Button>
            <Button
                style={{position:"relative", left:"70%", transform:"translate(-0%, 0%)"}}
                onClick={async (e) => {
                    // console.log(getCurrentScene()?._id)
                    console.log(currentContributions)
                }}
            >
                Next Scene
            </Button>



        </div>
    )

}

export default Camp;