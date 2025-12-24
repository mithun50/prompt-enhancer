import { GoogleGenAI } from "@google/genai";
import { OpenRouter } from "@openrouter/sdk";
import { useState } from "react";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [promptGenerated, setPromptGenerated] = useState("");
  const openRouter = new OpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  });
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

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
    1. Task: Here you understand what the user needs to be done and add a task sentence in the prompt, by inserting a persona and a output format, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift to my friend for her birthday" .
    2. Context: Adding context to the prompt tells what the user really needs and makes an model understand any backstory provided, making it to generate a more precise outcomes, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift to my friend for her birthday, she's turning 23 year old, and loves solo leveling, naruto, one piece"
    3. References: Adding references to your prompt helps in providing examples or styles that align with the desired output, making the generation more consistent, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift to my friend for her birthday, she's turning 23 year old, and loves solo leveling, naruto, one piece. And last time i had gifted her an naruto ornament and she like it."
    4. Constraints: Adding constraints helps in defining boundaries and limits to the output, ensuring it stays within the desired parameters, the prompt becomes "Act as an expert in anime and suggest me some ornaments, figurine, posters to gift that can add meaning to our friendship to my friend's birthday, she's turning 23 year old, and loves solo leveling, naruto, one piece. And last time i had gifted her an naruto ornament and she like it."
    6. Evaluation: Consider how the output will be evaluated and include criteria that help achieve the desired quality.

    STRICT OUTPUT REQUIREMENTS
    1. The output should be VALID JSON
    2. Give an output data, this data is an object containing key "prompt", the value of this "prompt" should be the combined ENHANCED prompt generated.
  `;

  const handleGenerate = async () => {
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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: modelPrompt,
    });
    setPromptGenerated(response.text);
  };

  return (
    <>
      <div>
        <label htmlFor="text">Enter your prompt</label>
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
      </div>
      <button onClick={handleGenerate}>Generate</button>
      <div>{promptGenerated}</div>
    </>
  );
}

export default App;
