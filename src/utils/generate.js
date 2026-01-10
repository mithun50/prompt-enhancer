import { GoogleGenAI } from "@google/genai";
import { OpenRouter } from "@openrouter/sdk";

// const openRouter = new OpenRouter({
//     apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
// });
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateEnhancedPrompt(userPrompt) {
    const modelPrompt = `
    You are an prompt engineer, you take input from the user and enhance their prompt which will in return give better outputs when used.
    User might have input their prompts
    1. in Broken english
    2. have given only minimal context of what the task is.
    3. for generating an image.
    Irrespective of the challenges you face or incorrect inputs you get, your job is to understand what the user's task is and create a prompt which gives a refined outputs. 
    Following is the user input "${userPrompt}".
    for example Let's say the user have asked for a birthday gift for a friend.
    You should structure the prompt in the following ways:
    1. Task: Here you understand what the user needs to be done and add a task sentence in the prompt, by inserting a persona and a output format, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift to my friend for her birthday".
    2. Context: Adding context to the prompt tells what the user really needs and makes an model understand any backstory provided, making it to generate a more precise outcomes, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift to my friend for her birthday, she's turning 23 year old, and loves solo leveling, naruto, one piece"
    3. References: Adding references to your prompt helps in providing examples or styles that align with the desired output, making the generation more consistent, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift to my friend for her birthday, she's turning 23 year old, and loves solo leveling, naruto, one piece. And last time i had gifted her an naruto ornament and she like it."
    4. Constraints: Adding constraints helps in defining boundaries and limits to the output, ensuring it stays within the desired parameters, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift that can add meaning to our friendship to my friend's birthday, she's turning 23 year old, and loves solo leveling, naruto, one piece. And last time i had gifted her an naruto ornament and she like it."
    6. Evaluation: Consider how the output will be evaluated and include criteria that help achieve the desired quality.

    STRICT OUTPUT REQUIREMENTS
    1. The output should be VALID JSON
    2. Give an output data, this data is an object containing key "prompt", the value of this "prompt" should be the combined ENHANCED prompt generated.
    3. Combine all the structure into single prompt, don't explicitly mention the heading, generated prompt should be eligible to be copy and pasted.
  `;

    // open router
    // const completion = await openRouter.chat.send({
    //   model: "openrouter/auto",
    //   messages: [
    //     {
    //       role: "user",
    //       content: modelPrompt,
    //     },
    //   ],
    // });
    // setPromptGenerated(completion.choices[0].message.content);

    // Gemini
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: modelPrompt,
        });
        const aiResponse = response.candidates[0]?.content?.parts[0]?.text || "";
        const parsedResponse = parseResponse(aiResponse);
        return parsedResponse;
    } catch (error) {
        console.log('Gemini API Error:', error);

        if (error.message && error.message.includes('503')) {
            throw new Error('Gemini is busy right now. Please try again in a moment.');
        } else if (error.message && error.message.includes('API_KEY')) {
            throw new Error('Invalid API key. Please check your Gemini API key.');
        } else {
            throw new Error('Failed to generate content. Please try again.');
        }
    }
}

function parseResponse(response) {
    try {
        let parsed;
        if (typeof response === 'string') {
            const cleaned = response
                .trim()
                .replace(/^```(?:json)?/i, '')
                .replace(/```$/i, '')
                .trim();
            parsed = JSON.parse(cleaned);
        } else {
            parsed = response;
        }
        const data = parsed?.prompt;
        return data;
    } catch {
        return response;
    }
}