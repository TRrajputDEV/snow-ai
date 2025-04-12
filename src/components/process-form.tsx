// src/components/process-form.tsx
import React, { useState, FormEvent } from 'react';
import { ChatInterface } from './ui/chat-interface';
import { MarkdownResponse } from './ui/markdown-response';
import { processWithGemini, ChatMessage } from '../lib/gemini-api';

interface EnhancedChatMessage extends ChatMessage {
    timestamp: Date;
}

export function ProcessForm() {
    const [messages, setMessages] = useState<EnhancedChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim() || isLoading) return;

        // Add user message with timestamp
        const userMessage: EnhancedChatMessage = {
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Get response from Gemini
            const allMessages = [...messages, userMessage];
            const response = await processWithGemini(allMessages);

            // Add assistant message with timestamp
            const assistantMessage: EnhancedChatMessage = {
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error('Error in chat submission:', error);
            // Add error message with timestamp
            const errorMessage: EnhancedChatMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error processing your request. Please try again.',
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Render messages with proper markdown formatting for assistant messages
    const renderMessages = () => {
        return messages.map((message) => ({
            role: message.role,
            content: message.role === 'assistant' ? (
                <MarkdownResponse content={message.content} />
            ) : (
                message.content
            ),
            timestamp: message.timestamp
        }));
    };

    return (
        <ChatInterface
            messages={renderMessages()}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
}