import { count } from 'console';
import { apiKey } from './API_KEY'
const url = 'https://api.together.xyz/v1/chat/completions';

export const getHook = ()=>{
    const prompt = "Make a hook for a adventure story set in a tavern starting right after four legendary heroes defeated a fearsome and terrifying dragon. "
    return askLLM(prompt)
}

export const askLLM = (prompt: string)=>{

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    })

    const data = {
        model: 'meta-llama/Llama-2-70b-chat-hf',
        max_tokens: 150,
        // prompt: prompt, //"Make a hook for a adventure story set in a tavern starting right after four legendary heroes defeated a fearsome and terrifying dragon. ",
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        messages: [{
            role: "user",
            content: prompt
        }]
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    };

    const result =  fetch(url, options)
                .then(response => response.json())
                .catch(error => console.log("Error in fetching hook: ", error))
    // Parsing for completions endpoint
    const storyHook = result
                    .then(r => r["choices"][0]["message"]["content"])
    //             .then(r => r['choices'][0]['text'])
                    .catch(error => console.log("Error in parsing result json: ", error))
    // Parsing for chat endpoint
    return storyHook
}

export const makeNextScene = (currentScene: string, contributions: string[])=>{
    const prompt = `
    Here is a scene in a story 

    \`\`\`
    ${currentScene}
    \`\`\`

    Here are some ways this story might be continued

    * ${contributions.join("\n  * ")}

    You are a story teller and you must pick and choose from these ideas to continue the narrative of the story.

    `
    console.log("Prompt for next scene" + prompt)
    const result =  askLLM(prompt)
    console.log("Prompt result" + result)
    return result
}

export const getImage = (hook: String)=>{
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    })

    const data = {
        model: 'prompthero/openjourney',
        // max_tokens: 128,
        prompt: hook,
        temperature: 0.7,
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    };

    const result =  fetch(url, options)
                .then(response => response.json())
                .catch(error => console.log("Error in fetching hook: ", error))
    // const storyHook = result
    //             .then(r => r['choices'][0]['text'])
    //             .catch(error => console.log("Error in parsing result json: ", error))
    return result
}