import React, { useState } from 'react'
import { Copy, Loader2 } from 'lucide-react'

function ViewPrompt({ prompt, isLoading, errorMessage }) {
    const [showCopyText, setShowCopyText] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt)
            setShowCopyText(true)
            setTimeout(() => setShowCopyText(false), 1500)
        } catch (error) {
            console.error("Error copying prompt:", error);
        }
    }

    if (errorMessage) {
        return (
            <div className='h-full w-full flex flex-col gap-3 items-center justify-center text-center text-white'>
                <p className='hind-500 text-lg'>{errorMessage}</p>
                <p className='hind-300 text-sm'>Please try again after a short wait.</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='h-full w-full flex flex-col gap-4 items-center justify-center text-center text-white/80'>
                <Loader2 className='animate-spin' size={32} />
                <p className='hind-400 tracking-wide text-base sm:text-lg'>Crafting your enhanced prompt…</p>
            </div>
        )
    }

    if (!prompt) {
        return (
            <div className='h-full w-full flex flex-col items-center justify-center text-center text-white/80 gap-3'>
                <p className='hind-500 text-lg'>Ready when you are!</p>
                <p className='hind-300 text-base max-w-md leading-relaxed'>
                    Start by describing what you want to achieve in the textbox below and hit <span className='text-white'>Evaluate</span> to watch your prompt transform.
                </p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-4 justify-between h-full'>
            <div className='whitespace-pre-wrap leading-relaxed text-white/90 overflow-y-auto pr-2 custom-scrollbar'>
                {prompt}
            </div>
            <div className='flex justify-end items-center pr-5 relative group'>
                <button onClick={handleCopy} className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50' disabled={!prompt}>
                    <Copy size={20} />
                </button>
                {showCopyText && (
                    <div className='absolute top-8 -right-1 hind-300 text-sm bg-[#305A6C]/70 px-2 py-0.5 rounded-md opacity-100 transition-opacity duration-300'>
                        Copied!
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewPrompt