import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, ChevronRight, Clock, Sparkles } from 'lucide-react';

function ChatSidebar({
    chats,
    activeChatId,
    onSelectChat,
    onNewChat,
    onDeleteChat,
    isOpen,
    onToggle,
}) {
    const [hoveredChatId, setHoveredChatId] = useState(null);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const groupedChats = chats.reduce((groups, chat) => {
        const dateKey = formatDate(chat.updatedAt);
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(chat);
        return groups;
    }, {});

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative top-0 left-0 h-full z-50 lg:z-auto flex flex-col bg-[#0d1b21]/95 lg:bg-[#0d1b21]/80 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ease-out ${
                    isOpen ? 'w-72 sm:w-80' : 'w-0 lg:w-[72px]'
                } overflow-hidden`}
            >
                {/* Header */}
                <div className='p-4 border-b border-white/5'>
                    {isOpen ? (
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#317F84] to-[#BDE8DC]/80 flex items-center justify-center'>
                                    <Sparkles className='w-4 h-4 text-white' />
                                </div>
                                <span className='kant-700 text-lg text-white'>History</span>
                            </div>
                            <button
                                onClick={onToggle}
                                className='p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white'
                            >
                                <ChevronRight className='w-5 h-5 rotate-180' />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onToggle}
                            className='w-full p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white hidden lg:flex justify-center'
                        >
                            <ChevronRight className='w-5 h-5' />
                        </button>
                    )}
                </div>

                {/* New Chat Button */}
                <div className={`p-3 ${isOpen ? '' : 'hidden lg:block'}`}>
                    <button
                        onClick={onNewChat}
                        className={`w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#317F84]/20 to-transparent hover:from-[#317F84]/30 rounded-xl border border-[#317F84]/30 hover:border-[#317F84]/50 text-white transition-all duration-200 group ${
                            isOpen ? 'justify-start' : 'justify-center'
                        }`}
                    >
                        <Plus className='w-5 h-5 text-[#BDE8DC] group-hover:rotate-90 transition-transform duration-300' />
                        {isOpen && <span className='hind-500 text-sm'>New Conversation</span>}
                    </button>
                </div>

                {/* Chat List */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar ${isOpen ? 'px-3 pb-4' : 'hidden lg:block lg:px-2'}`}>
                    {isOpen ? (
                        chats.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-12 px-4'>
                                <div className='w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4'>
                                    <MessageSquare className='w-8 h-8 text-white/20' />
                                </div>
                                <p className='hind-500 text-sm text-white/40 text-center'>No conversations yet</p>
                                <p className='hind-300 text-xs text-white/20 mt-1 text-center'>Start a new chat to begin</p>
                            </div>
                        ) : (
                            Object.entries(groupedChats).map(([dateKey, dateChats]) => (
                                <div key={dateKey} className='mb-5'>
                                    <div className='flex items-center gap-2 px-2 mb-2'>
                                        <Clock className='w-3 h-3 text-white/30' />
                                        <span className='hind-500 text-xs text-white/30 uppercase tracking-wider'>
                                            {dateKey}
                                        </span>
                                    </div>
                                    <div className='space-y-1'>
                                        {dateChats.map((chat) => (
                                            <div
                                                key={chat.id}
                                                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    chat.id === activeChatId
                                                        ? 'bg-[#317F84]/20 border border-[#317F84]/30'
                                                        : 'hover:bg-white/5 border border-transparent'
                                                }`}
                                                onClick={() => onSelectChat(chat.id)}
                                                onMouseEnter={() => setHoveredChatId(chat.id)}
                                                onMouseLeave={() => setHoveredChatId(null)}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                    chat.id === activeChatId
                                                        ? 'bg-[#317F84]/30'
                                                        : 'bg-white/5'
                                                }`}>
                                                    <MessageSquare className={`w-4 h-4 ${
                                                        chat.id === activeChatId
                                                            ? 'text-[#BDE8DC]'
                                                            : 'text-white/40'
                                                    }`} />
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <span className={`block truncate hind-400 text-sm ${
                                                        chat.id === activeChatId
                                                            ? 'text-white'
                                                            : 'text-white/70'
                                                    }`}>
                                                        {chat.title}
                                                    </span>
                                                    <span className='text-xs text-white/30 hind-300'>
                                                        {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                                {(hoveredChatId === chat.id || chat.id === activeChatId) && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDeleteChat(chat.id);
                                                        }}
                                                        className='p-1.5 hover:bg-red-500/20 rounded-lg text-white/30 hover:text-red-400 transition-all'
                                                    >
                                                        <Trash2 className='w-4 h-4' />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        <div className='space-y-2 py-2'>
                            {chats.slice(0, 6).map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => {
                                        onSelectChat(chat.id);
                                        onToggle();
                                    }}
                                    className={`w-full p-2.5 rounded-xl transition-all ${
                                        chat.id === activeChatId
                                            ? 'bg-[#317F84]/20 border border-[#317F84]/30'
                                            : 'hover:bg-white/5 border border-transparent'
                                    }`}
                                    title={chat.title}
                                >
                                    <MessageSquare className={`w-5 h-5 mx-auto ${
                                        chat.id === activeChatId ? 'text-[#BDE8DC]' : 'text-white/40'
                                    }`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {isOpen && chats.length > 0 && (
                    <div className='p-4 border-t border-white/5'>
                        <div className='flex items-center justify-between text-white/30'>
                            <span className='hind-300 text-xs'>
                                {chats.length} conversation{chats.length !== 1 ? 's' : ''}
                            </span>
                            <span className='text-xs hind-300'>Stored locally</span>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}

export default ChatSidebar;
