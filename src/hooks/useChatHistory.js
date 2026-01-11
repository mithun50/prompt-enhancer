import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'eleva_chat_history';

// Generate unique ID
const generateId = () => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Get initial chats from localStorage
const getStoredChats = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
    return [];
};

// Save chats to localStorage
const saveChats = (chats) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
};

export function useChatHistory() {
    const [chats, setChats] = useState(getStoredChats);
    const [activeChatId, setActiveChatId] = useState(null);

    // Save to localStorage whenever chats change
    useEffect(() => {
        saveChats(chats);
    }, [chats]);

    // Set initial active chat
    useEffect(() => {
        if (chats.length > 0 && !activeChatId) {
            setActiveChatId(chats[0].id);
        }
    }, [chats, activeChatId]);

    // Get active chat
    const activeChat = chats.find(chat => chat.id === activeChatId) || null;

    // Create new chat
    const createNewChat = useCallback(() => {
        const newChat = {
            id: generateId(),
            title: 'New Chat',
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        return newChat.id;
    }, []);

    // Add user message immediately (returns message ID for later update)
    const addUserMessage = useCallback((userPrompt) => {
        const messageId = generateId();

        if (!activeChatId) {
            const newId = createNewChat();
            setChats(prev => prev.map(chat => {
                if (chat.id === newId) {
                    const title = userPrompt.slice(0, 30) + (userPrompt.length > 30 ? '...' : '');
                    return {
                        ...chat,
                        title,
                        messages: [{
                            id: messageId,
                            userPrompt,
                            enhancedPrompt: null, // Will be filled when response comes
                            pending: true,
                            timestamp: Date.now(),
                        }],
                        updatedAt: Date.now(),
                    };
                }
                return chat;
            }));
            return messageId;
        }

        setChats(prev => prev.map(chat => {
            if (chat.id === activeChatId) {
                const isFirstMessage = chat.messages.length === 0;
                const title = isFirstMessage
                    ? userPrompt.slice(0, 30) + (userPrompt.length > 30 ? '...' : '')
                    : chat.title;

                return {
                    ...chat,
                    title,
                    messages: [...chat.messages, {
                        id: messageId,
                        userPrompt,
                        enhancedPrompt: null, // Will be filled when response comes
                        pending: true,
                        timestamp: Date.now(),
                    }],
                    updatedAt: Date.now(),
                };
            }
            return chat;
        }));

        return messageId;
    }, [activeChatId, createNewChat]);

    // Update message with AI response
    const updateMessageResponse = useCallback((messageId, enhancedPrompt) => {
        setChats(prev => prev.map(chat => ({
            ...chat,
            messages: chat.messages.map(msg => {
                if (msg.id === messageId) {
                    return {
                        ...msg,
                        enhancedPrompt,
                        pending: false,
                    };
                }
                return msg;
            }),
            updatedAt: Date.now(),
        })));
    }, []);

    // Legacy: Add message to active chat (both user and response together)
    const addMessage = useCallback((userPrompt, enhancedPrompt) => {
        if (!activeChatId) {
            const newId = createNewChat();
            setChats(prev => prev.map(chat => {
                if (chat.id === newId) {
                    const title = userPrompt.slice(0, 30) + (userPrompt.length > 30 ? '...' : '');
                    return {
                        ...chat,
                        title,
                        messages: [{
                            id: generateId(),
                            userPrompt,
                            enhancedPrompt,
                            timestamp: Date.now(),
                        }],
                        updatedAt: Date.now(),
                    };
                }
                return chat;
            }));
            return;
        }

        setChats(prev => prev.map(chat => {
            if (chat.id === activeChatId) {
                const isFirstMessage = chat.messages.length === 0;
                const title = isFirstMessage
                    ? userPrompt.slice(0, 30) + (userPrompt.length > 30 ? '...' : '')
                    : chat.title;

                return {
                    ...chat,
                    title,
                    messages: [...chat.messages, {
                        id: generateId(),
                        userPrompt,
                        enhancedPrompt,
                        timestamp: Date.now(),
                    }],
                    updatedAt: Date.now(),
                };
            }
            return chat;
        }));
    }, [activeChatId, createNewChat]);

    // Delete chat
    const deleteChat = useCallback((chatId) => {
        setChats(prev => {
            const filtered = prev.filter(chat => chat.id !== chatId);
            if (activeChatId === chatId) {
                setActiveChatId(filtered.length > 0 ? filtered[0].id : null);
            }
            return filtered;
        });
    }, [activeChatId]);

    // Clear all chats
    const clearAllChats = useCallback(() => {
        setChats([]);
        setActiveChatId(null);
    }, []);

    // Select chat
    const selectChat = useCallback((chatId) => {
        setActiveChatId(chatId);
    }, []);

    // Rename chat
    const renameChat = useCallback((chatId, newTitle) => {
        setChats(prev => prev.map(chat => {
            if (chat.id === chatId) {
                return { ...chat, title: newTitle, updatedAt: Date.now() };
            }
            return chat;
        }));
    }, []);

    return {
        chats,
        activeChat,
        activeChatId,
        createNewChat,
        addMessage,
        addUserMessage,
        updateMessageResponse,
        deleteChat,
        clearAllChats,
        selectChat,
        renameChat,
    };
}

export default useChatHistory;
