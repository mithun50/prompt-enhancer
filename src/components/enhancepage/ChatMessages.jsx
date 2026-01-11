import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function MessageBubble({ message, type }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Error copying:', error);
        }
    };

    const isUser = type === 'user';

    return (
        <div className={`flex gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div
                className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shadow-lg ${
                    isUser
                        ? 'bg-gradient-to-br from-[#317F84] to-[#305A6C] border border-[#BDE8DC]/20'
                        : 'bg-gradient-to-br from-[#305A6C] to-[#1a3a3a] border border-[#317F84]/30'
                }`}
            >
                {isUser ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#BDE8DC]" />
                ) : (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#BDE8DC]" />
                )}
            </div>

            {/* Message Content */}
            <div
                className={`flex-1 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] ${
                    isUser ? 'text-right' : ''
                }`}
            >
                <div
                    className={`inline-block text-left px-4 sm:px-5 py-3 sm:py-4 shadow-lg ${
                        isUser
                            ? 'bg-gradient-to-br from-[#317F84]/40 to-[#317F84]/20 border border-[#BDE8DC]/20 rounded-2xl rounded-tr-md'
                            : 'bg-gradient-to-br from-[#305A6C]/60 to-[#305A6C]/30 border border-[#317F84]/20 rounded-2xl rounded-tl-md'
                    }`}
                >
                    {isUser ? (
                        <p className="hind-400 text-sm sm:text-base text-white/90 whitespace-pre-wrap">
                            {message}
                        </p>
                    ) : (
                        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => (
                                        <p className="hind-400 text-sm sm:text-base text-white/90 mb-2 last:mb-0">
                                            {children}
                                        </p>
                                    ),
                                    h1: ({ children }) => (
                                        <h1 className="kant-700 text-lg sm:text-xl text-white mb-2">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="kant-700 text-base sm:text-lg text-white mb-2">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="kant-600 text-sm sm:text-base text-white mb-2">
                                            {children}
                                        </h3>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside text-white/90 mb-2 space-y-1 text-sm sm:text-base">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside text-white/90 mb-2 space-y-1 text-sm sm:text-base">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="hind-400">{children}</li>
                                    ),
                                    code: ({ inline, children }) =>
                                        inline ? (
                                            <code className="bg-black/30 px-1.5 py-0.5 rounded text-[#BDE8DC] text-xs sm:text-sm font-mono">
                                                {children}
                                            </code>
                                        ) : (
                                            <code className="block bg-black/30 p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-mono overflow-x-auto">
                                                {children}
                                            </code>
                                        ),
                                    pre: ({ children }) => (
                                        <pre className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto mb-2">
                                            {children}
                                        </pre>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-2 border-[#317F84] pl-3 text-white/70 italic text-sm sm:text-base">
                                            {children}
                                        </blockquote>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="hind-600 text-white">{children}</strong>
                                    ),
                                    em: ({ children }) => (
                                        <em className="text-white/80">{children}</em>
                                    ),
                                }}
                            >
                                {message}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Copy button for enhanced prompts */}
                {!isUser && (
                    <button
                        onClick={() => handleCopy(message)}
                        className={`mt-2 sm:mt-3 inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm transition-all duration-200 ${
                            copied
                                ? 'bg-[#BDE8DC]/20 text-[#BDE8DC] border border-[#BDE8DC]/30'
                                : 'bg-[#305A6C]/40 hover:bg-[#317F84]/30 text-white/60 hover:text-white border border-[#317F84]/20 hover:border-[#317F84]/40'
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hind-400">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hind-400">Copy prompt</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

function ChatMessages({ messages, isLoading }) {
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-18 h-18 sm:w-22 sm:h-22 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-[#317F84]/40 to-[#305A6C]/40 border border-[#BDE8DC]/20 flex items-center justify-center mb-5 sm:mb-7 shadow-xl">
                    <Sparkles className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 text-[#BDE8DC]" />
                </div>
                <h2 className="kant-700 text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3">
                    Ready to enhance your prompts
                </h2>
                <p className="hind-400 text-sm sm:text-base md:text-lg text-white/50 max-w-md leading-relaxed">
                    Describe what you want to achieve and I'll transform it into a well-structured, effective prompt.
                </p>
            </div>
        );
    }

    // Loading indicator component
    const LoadingBubble = () => (
        <div className="flex gap-3 sm:gap-4">
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#305A6C] to-[#1a3a3a] border border-[#317F84]/30 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#BDE8DC] animate-pulse" />
            </div>
            <div className="bg-gradient-to-br from-[#305A6C]/60 to-[#305A6C]/30 border border-[#317F84]/20 rounded-2xl rounded-tl-md px-4 sm:px-5 py-3 sm:py-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-[#BDE8DC] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-[#BDE8DC] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-[#BDE8DC] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="hind-400 text-sm text-white/50">Enhancing your prompt...</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {messages.map((msg) => (
                <div key={msg.id} className="space-y-3 sm:space-y-4">
                    {/* User message - always show */}
                    <MessageBubble message={msg.userPrompt} type="user" />

                    {/* Enhanced prompt - show if exists, otherwise show loading */}
                    {msg.enhancedPrompt ? (
                        <MessageBubble message={msg.enhancedPrompt} type="assistant" />
                    ) : msg.pending ? (
                        <LoadingBubble />
                    ) : null}
                </div>
            ))}

            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatMessages;
