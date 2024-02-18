import { apiKey } from './API_KEY'
const url = 'https://api.together.xyz/v1/completions';

const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
})

const data = {
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    max_tokens: 512,
    prompt: "Make a hook for a adventure story set in a tavern starting right after four legendary heroes defeated a fearsome and terrifying dragon",
    temperature: 0.7,
};

const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
};


export const getHook = ()=>{
    const result =  fetch(url, options)
                .then(response => response.json())
                .catch(error => console.log("Error in fetching hook: ", error))
    const storyHook = result
                .then(r => r['choices'][0]['text'])
                .catch(error => console.log("Error in parsing result json: ", error))
    return storyHook
}