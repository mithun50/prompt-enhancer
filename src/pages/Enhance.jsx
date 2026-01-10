import React, { useState } from 'react'
import { generateEnhancedPrompt } from "../utils/generate";
import ViewPrompt from '../components/enhancepage/ViewPrompt';
import Header from '../components/common/Header';

function Enhance() {
    const [userPrompt, setUserPrompt] = useState("");
    const [promptGenerated, setPromptGenerated] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleGenerate = async () => {
        if (!userPrompt.trim() || isLoading) return;

        setIsLoading(true);
        setPromptGenerated("");
        setErrorMessage("");
        try {
            setTimeout(() => {
                setUserPrompt("");
            }, 1000);
            const response = await generateEnhancedPrompt(userPrompt);
            setPromptGenerated(response);
        } catch (error) {
            console.error("Error generating prompt:", error);
            if (error.message && error.message.includes('Gemini is busy right now')) {
                setErrorMessage('Gemini is busy right now. Please try again in a moment.');
            } else {
                setErrorMessage('Error generating prompt. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full lg:w-1/2 h-full mx-auto pt-20 sm:pt-24 lg:pt-28 p-4 sm:p-6 lg:p-10 gap-y-10 flex flex-col items-center justify-between'>
            <Header showCTA={false} />

            <div className='bg-[#B5DCED]/40 w-full h-full rounded-xl p-4 sm:p-6 hind-400 text-white text-base sm:text-lg pt-24 sm:pt-30'>
                <ViewPrompt prompt={promptGenerated} isLoading={isLoading} errorMessage={errorMessage} />
            </div>

            <div className='flex-1 w-full flex flex-col items-center justify-center gap-8'>

                <div className='w-full max-w-4xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 bg-[#305A6C]/40 px-4 py-5 border-5 border-[#FFFFFF]/40 rounded-xl'>
                    <textarea
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleGenerate();
                            }
                        }}
                        placeholder='Prompt here'
                        className='w-full sm:flex-1 bg-[#B5DCED]/40 rounded-xl py-3 px-4 text-white placeholder:text-white/60 resize-none h-28 sm:h-20 shadow-inner shadow-[#1f3d4a]/40 hind-400 tracking-wide'
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !userPrompt.trim()}
                        className={`w-full sm:w-auto transition-all hover:scale-[1.03] border-3 border-[#FFFFFF]/40 bg-linear-350 from-[#31746c] via-[#4fa59b] via-60% via-[#31746c] to-[#FFFFFF]/30 to-90% rounded-xl py-2 px-5 kant-400 text-white tracking-wide shadow-[0_6px_18px_rgba(31,61,74,0.45)] cursor-pointer ${isLoading || !userPrompt.trim() ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Evaluating…' : 'Evaluate'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Enhance