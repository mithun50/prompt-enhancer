import React, { useState } from 'react'
import { Copy, Check, Loader2, Sparkles } from 'lucide-react'

function ViewPrompt({ prompt, isLoading, errorMessage }) {
    const [showCopyText, setShowCopyText] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt)
            setShowCopyText(true)
            setTimeout(() => setShowCopyText(false), 2000)
        } catch (error) {
            console.error("Error copying prompt:", error);
        }
    }

    if (errorMessage) {
        return (
            <div className='h-full w-full flex flex-col gap-3 sm:gap-4 items-center justify-center text-center text-white px-4'>
                <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-red-500/20 flex items-center justify-center'>
                    <span className='text-2xl sm:text-3xl'>!</span>
                </div>
                <p className='hind-500 text-base sm:text-lg md:text-xl'>{errorMessage}</p>
                <p className='hind-300 text-sm sm:text-base text-white/70'>Please try again after a short wait.</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='h-full w-full flex flex-col gap-4 sm:gap-5 items-center justify-center text-center text-white/80'>
                <div className='relative'>
                    <Loader2 className='animate-spin w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' />
                    <Sparkles className='absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-[#BDE8DC] animate-pulse' />
                </div>
                <div className='flex flex-col gap-1 sm:gap-2'>
                    <p className='hind-500 tracking-wide text-base sm:text-lg md:text-xl'>Crafting your enhanced prompt...</p>
                    <p className='hind-300 text-xs sm:text-sm text-white/50'>Adding context, structure, and clarity</p>
                </div>
            </div>
        )
    }

    if (!prompt) {
        return (
            <div className='h-full w-full flex flex-col items-center justify-center text-center text-white/80 gap-4 sm:gap-5 px-4'>
                <div className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#317F84]/30 flex items-center justify-center'>
                    <Sparkles className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#BDE8DC]' />
                </div>
                <div className='flex flex-col gap-2 sm:gap-3'>
                    <p className='hind-600 text-lg sm:text-xl md:text-2xl text-white'>Ready when you are!</p>
                    <p className='hind-400 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md leading-relaxed text-white/70'>
                        Describe what you want to achieve below and hit <span className='text-white font-medium'>Evaluate</span> to transform your prompt.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-3 sm:gap-y-4 h-full'>
            {/* Prompt Content */}
            <div className='flex-1 whitespace-pre-wrap leading-relaxed text-white/90 overflow-y-auto pr-2 custom-scrollbar text-sm sm:text-base md:text-lg'>
                {prompt}
            </div>

            {/* Copy Button */}
            <div className='flex justify-end items-center pt-2 sm:pt-3 border-t border-white/10'>
                <button
                    onClick={handleCopy}
                    disabled={!prompt}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 ${
                        showCopyText
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
                    } ${!prompt ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {showCopyText ? (
                        <>
                            <Check className='w-4 h-4 sm:w-5 sm:h-5' />
                            <span className='hind-400 text-xs sm:text-sm'>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className='w-4 h-4 sm:w-5 sm:h-5' />
                            <span className='hind-400 text-xs sm:text-sm'>Copy</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ViewPrompt
