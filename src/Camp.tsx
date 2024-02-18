import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import campfire from './assets/summer-campfire.jpg'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'

function Camp() {
    const [storyContribution, setStoryContribution] = useState("")

    const shareContribution = useMutation(api.campingFunctions.shareContribution);
    const getTheHook = useAction(api.campingFunctions.pullStoryHook)



    return (
        <>
            <h1 className="text-3xl font-extrabold mt-8 text-center">
                Welcome to the campfire 🔥
            </h1>

            <div style={{display: 'flex', }}>
                <div style={{width: "60%", position: 'relative'}}>
                    <img src={campfire}></img>
                    <p style={{position: "absolute", top:"50%", backgroundColor: "rgba(0,0,0,0.7)"}}>
                        Hello there this text needs to be overlaid on the image
                    </p>
                </div>
                <form style={{display: "flex", flexDirection:"column"}}>
                    <Input
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
                            await shareContribution({ contribution: storyContribution.trim(), })
                            setStoryContribution("")
                        }}
                        >
                            Share your story
                        </Button>
                </form>
            </div>
            



            <Button
                onClick={async (e) => {
                    await getTheHook()
                }}
            >
                Get the hook
            </Button>
        </>
    )

}

export default Camp;