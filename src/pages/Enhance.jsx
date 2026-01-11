import React, { useState } from 'react';
import { generateEnhancedPrompt } from "../utils/generate";
import ChatSidebar from '../components/enhancepage/ChatSidebar';
import ChatMessages from '../components/enhancepage/ChatMessages';
import useChatHistory from '../hooks/useChatHistory';
import { Send, Sparkles, ArrowLeft, Menu, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Enhance() {
    const navigate = useNavigate();
    const [userPrompt, setUserPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);

    const {
        chats,
        activeChat,
        activeChatId,
        createNewChat,
        addUserMessage,
        updateMessageResponse,
        deleteChat,
        selectChat,
    } = useChatHistory();

    // Check for Speech Recognition support
    React.useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        setSpeechSupported(!!SpeechRecognition);
    }, []);

    // Speech-to-Text functionality
    const toggleListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setErrorMessage('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setErrorMessage('');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                setErrorMessage('Microphone access denied. Please allow microphone access.');
            } else if (event.error === 'no-speech') {
                setErrorMessage('No speech detected. Please try again.');
            }
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleGenerate = async () => {
        if (!userPrompt.trim() || isLoading) return;

        const currentPrompt = userPrompt;
        setUserPrompt("");
        setErrorMessage("");

        // Show user message immediately
        const messageId = addUserMessage(currentPrompt);
        setIsLoading(true);

        try {
            // Pass chat history for context
            const chatHistory = activeChat?.messages || [];
            const response = await generateEnhancedPrompt(currentPrompt, chatHistory);
            // Update with AI response
            updateMessageResponse(messageId, response);
        } catch (error) {
            console.error("Error generating prompt:", error);
            if (error.message && error.message.includes('Gemini is busy right now')) {
                setErrorMessage('Gemini is busy right now. Please try again in a moment.');
            } else {
                setErrorMessage('Error generating prompt. Please try again.');
            }
            // Update with error message
            updateMessageResponse(messageId, 'Error: Failed to generate response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        createNewChat();
        setSidebarOpen(false);
    };

    const handleSelectChat = (chatId) => {
        selectChat(chatId);
        setSidebarOpen(false);
    };

    return (
        <div className='min-h-screen min-h-dvh w-full flex bg-gradient-to-br from-[#1a3a3a] via-[#305A6C] to-[#203a43]'>
            {/* Sidebar */}
            <ChatSidebar
                chats={chats}
                activeChatId={activeChatId}
                onSelectChat={handleSelectChat}
                onNewChat={handleNewChat}
                onDeleteChat={deleteChat}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Main Content */}
            <div className='flex-1 flex flex-col min-w-0 relative'>
                {/* Subtle background pattern */}
                <div className='absolute inset-0 opacity-5'>
                    <div className='absolute top-20 left-10 w-72 h-72 bg-[#BDE8DC] rounded-full blur-[100px]' />
                    <div className='absolute bottom-20 right-10 w-96 h-96 bg-[#317F84] rounded-full blur-[120px]' />
                </div>

                {/* Custom Header - Sticky */}
                <header className='sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#317F84]/20 bg-[#1a3a3a]/95 backdrop-blur-xl'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className='lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white'
                        >
                            <Menu className='w-5 h-5' />
                        </button>

                        {/* Back Button - Desktop only */}
                        <button
                            onClick={() => navigate('/')}
                            className='hidden lg:flex p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white'
                        >
                            <ArrowLeft className='w-5 h-5' />
                        </button>

                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#317F84] to-[#305A6C] border border-[#BDE8DC]/20 flex items-center justify-center shadow-lg'>
                                <Sparkles className='w-4 h-4 text-[#BDE8DC]' />
                            </div>
                            <span className='kant-700 text-lg sm:text-xl text-white'>Eleva</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        {activeChat && (
                            <div className='hidden sm:block'>
                                <span className='hind-400 text-sm text-white/40 truncate max-w-[200px] block'>
                                    {activeChat.title}
                                </span>
                            </div>
                        )}

                        {/* Back Button - Mobile */}
                        <button
                            onClick={() => navigate('/')}
                            className='lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white'
                        >
                            <ArrowLeft className='w-5 h-5' />
                        </button>
                    </div>
                </header>

                {/* Chat Area */}
                <div className='flex-1 flex flex-col relative z-10 overflow-hidden'>
                    {/* Messages */}
                    <div className='flex-1 overflow-hidden'>
                        <ChatMessages
                            messages={activeChat?.messages || []}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className='px-4 sm:px-6 py-2'>
                            <div className='max-w-3xl mx-auto bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-300 text-sm hind-400 flex items-center gap-2'>
                                <span className='w-2 h-2 bg-red-400 rounded-full animate-pulse' />
                                {errorMessage}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className='p-4 sm:p-6'>
                        <div className='max-w-3xl mx-auto'>
                            {/* Input Container */}
                            <div className='relative'>
                                {/* Glow effect behind input */}
                                <div className='absolute -inset-1 bg-gradient-to-r from-[#317F84]/20 to-[#BDE8DC]/20 rounded-2xl blur-lg opacity-50' />

                                <div className='relative bg-[#1a2e38]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden'>
                                    <textarea
                                        value={userPrompt}
                                        onChange={(e) => setUserPrompt(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleGenerate();
                                            }
                                        }}
                                        placeholder={isListening ? 'Listening...' : 'What would you like to create today?'}
                                        className='w-full bg-transparent text-white text-sm sm:text-base placeholder:text-white/30 resize-none min-h-[56px] max-h-40 p-4 pr-28 hind-400 tracking-wide focus:outline-none'
                                        rows={1}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
                                        }}
                                    />

                                    {/* Action Buttons */}
                                    <div className='absolute right-3 bottom-3 flex items-center gap-2'>
                                        {/* Mic Button */}
                                        {speechSupported && (
                                            <button
                                                onClick={toggleListening}
                                                disabled={isLoading}
                                                className={`p-2.5 rounded-xl transition-all duration-300 ${
                                                    isListening
                                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                                                        : isLoading
                                                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white cursor-pointer'
                                                }`}
                                                title={isListening ? 'Stop listening' : 'Voice input'}
                                            >
                                                {isListening ? (
                                                    <MicOff className="w-5 h-5" />
                                                ) : (
                                                    <Mic className="w-5 h-5" />
                                                )}
                                            </button>
                                        )}

                                        {/* Send Button */}
                                        <button
                                            onClick={handleGenerate}
                                            disabled={isLoading || !userPrompt.trim()}
                                            className={`p-2.5 rounded-xl transition-all duration-300 ${
                                                isLoading || !userPrompt.trim()
                                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-[#317F84] to-[#3a9490] text-white cursor-pointer hover:shadow-lg hover:shadow-[#317F84]/30 hover:scale-105 active:scale-95'
                                            }`}
                                        >
                                            {isLoading ? (
                                                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Hint */}
                            <div className='flex items-center justify-center gap-4 mt-3'>
                                <span className='text-white/20 text-xs hind-300'>
                                    Press <kbd className='px-1.5 py-0.5 bg-white/10 rounded text-white/40'>Enter</kbd> to send
                                </span>
                                <span className='w-1 h-1 bg-white/20 rounded-full' />
                                <span className='text-white/20 text-xs hind-300'>
                                    <kbd className='px-1.5 py-0.5 bg-white/10 rounded text-white/40'>Shift + Enter</kbd> for new line
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Enhance;
