import campfire from './assets/summer-campfire.jpg'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'

function Camp() {
    const [storyContribution, setStoryContribution] = useState("")

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
                        setStoryContribution("")
                    }}
                    >
                        Share your story
                    </Button>
            </form>
        </>
    )

}

export default Camp;