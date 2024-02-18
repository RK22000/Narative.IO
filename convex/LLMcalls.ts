import { apiKey } from './API_KEY'
const url = 'https://api.together.xyz/v1/completions';


export const getHook = ()=>{

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    })

    const data = {
        model: 'meta-llama/Llama-2-70b-chat-hf',
        max_tokens: 128,
        prompt: "Make a hook for a adventure story set in a tavern starting right after four legendary heroes defeated a fearsome and terrifying dragon. ",
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
    const storyHook = result
                .then(r => r['choices'][0]['text'])
                .catch(error => console.log("Error in parsing result json: ", error))
    return storyHook
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