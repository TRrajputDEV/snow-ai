// // src/components/ui/chat-interface.tsx
// import React, { useRef, useEffect, useState } from 'react';
// import { Button } from './button';
// import { SearchInput } from './search-input';

// interface Message {
//     role: 'user' | 'assistant';
//     content: string | React.ReactNode;
//     timestamp?: Date;
// }

// interface ChatInterfaceProps {
//     messages: Message[];
//     inputValue: string;
//     setInputValue: (value: string) => void;
//     handleSubmit: (e: React.FormEvent) => void;
//     isLoading?: boolean;
// }

// export function ChatInterface({
//     messages,
//     inputValue,
//     setInputValue,
//     handleSubmit,
//     isLoading = false
// }: ChatInterfaceProps) {
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const chatContainerRef = useRef<HTMLDivElement>(null);
//     const [showScrollButton, setShowScrollButton] = useState(false);

//     // Auto-scroll to bottom when new messages arrive
//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [messages]);

//     // Check scroll position to show/hide scroll button
//     useEffect(() => {
//         const container = chatContainerRef.current;
//         if (!container) return;

//         const handleScroll = () => {
//             const { scrollTop, scrollHeight, clientHeight } = container;
//             const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
//             setShowScrollButton(isNotAtBottom);
//         };

//         container.addEventListener('scroll', handleScroll);
//         return () => container.removeEventListener('scroll', handleScroll);
//     }, []);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     const formatDate = (date: Date) => {
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     return (
//         <div className="flex flex-col h-[100vh] bg-gray-50 dark:bg-gray-900">
//             {/* Header with enhanced UI */}
//             <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="max-w-5xl mx-auto flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                         <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
//                                 <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
//                                 <path d="m9 12 2 2 4-4"></path>
//                             </svg>
//                         </div>
//                         <div>
//                             <h1 className="text-xl font-bold text-gray-800 dark:text-white">Process Optimizer</h1>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered business efficiency assistant</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                             <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
//                             Online
//                         </span>
//                     </div>
//                 </div>
//             </header>

//             {/* Side column for larger screens */}
//             <div className="flex flex-1 overflow-hidden">
//                 <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
//                     <div className="mb-6">
//                         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">How to use</h3>
//                         <ul className="space-y-2 text-sm">
//                             <li className="flex items-start space-x-2">
//                                 <span className="flex-shrink-0 mt-0.5 bg-blue-100 text-blue-600 rounded-full p-1">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <circle cx="12" cy="12" r="10"></circle>
//                                         <line x1="12" y1="16" x2="12" y2="12"></line>
//                                         <line x1="12" y1="8" x2="12.01" y2="8"></line>
//                                     </svg>
//                                 </span>
//                                 <span className="text-gray-700 dark:text-gray-300">Describe your business process</span>
//                             </li>
//                             <li className="flex items-start space-x-2">
//                                 <span className="flex-shrink-0 mt-0.5 bg-blue-100 text-blue-600 rounded-full p-1">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
//                                         <path d="m9 12 2 2 4-4"></path>
//                                     </svg>
//                                 </span>
//                                 <span className="text-gray-700 dark:text-gray-300">Get optimization suggestions</span>
//                             </li>
//                             <li className="flex items-start space-x-2">
//                                 <span className="flex-shrink-0 mt-0.5 bg-blue-100 text-blue-600 rounded-full p-1">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                                     </svg>
//                                 </span>
//                                 <span className="text-gray-700 dark:text-gray-300">Ask follow-up questions</span>
//                             </li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick prompts</h3>
//                         <div className="space-y-2">
//                             <button
//                                 onClick={() => setInputValue("Help me optimize my customer onboarding process")}
//                                 className="text-left w-full p-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition"
//                             >
//                                 Customer onboarding process
//                             </button>
//                             <button
//                                 onClick={() => setInputValue("How can I improve my inventory management?")}
//                                 className="text-left w-full p-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition"
//                             >
//                                 Inventory management
//                             </button>
//                             <button
//                                 onClick={() => setInputValue("Optimize my software development lifecycle")}
//                                 className="text-left w-full p-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition"
//                             >
//                                 Software development cycle
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main chat area with custom scrollbar */}
//                 <div className="flex-1 flex flex-col">
//                     <div
//                         ref={chatContainerRef}
//                         className="flex-1 overflow-y-auto px-4 py-6 md:px-6 custom-scrollbar"
//                         style={{
//                             scrollbarWidth: 'thin',
//                             scrollbarColor: '#CBD5E0 #F1F5F9'
//                         }}
//                     >
//                         <div className="max-w-3xl mx-auto space-y-6">
//                             {messages.length === 0 ? (
//                                 <div className="flex flex-col items-center justify-center h-full space-y-8">
//                                     <div className="bg-blue-600 text-white rounded-full p-4">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
//                                             <path d="m9 12 2 2 4-4"></path>
//                                         </svg>
//                                     </div>
//                                     <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 max-w-lg">
//                                         <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Welcome to Process Optimizer</h2>
//                                         <p className="text-gray-600 dark:text-gray-300 mb-4">Describe your business process, and I'll provide optimization recommendations to improve efficiency and reduce costs.</p>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
//                                             <button
//                                                 onClick={() => setInputValue("Help me optimize my customer support process")}
//                                                 className="text-left p-3 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition flex items-center"
//                                             >
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                                                 </svg>
//                                                 Customer support
//                                             </button>
//                                             <button
//                                                 onClick={() => setInputValue("Optimize our order fulfillment process")}
//                                                 className="text-left p-3 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition flex items-center"
//                                             >
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                     <path d="M9 17H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"></path>
//                                                     <path d="M9 17v-6"></path>
//                                                     <path d="M15 17v-2"></path>
//                                                     <path d="M12 17v-4"></path>
//                                                 </svg>
//                                                 Order fulfillment
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 messages.map((message, index) => {
//                                     // Add timestamp to message if not present
//                                     const timestamp = message.timestamp || new Date();

//                                     return (
//                                         <div
//                                             key={index}
//                                             className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                                         >
//                                             {message.role === 'assistant' && (
//                                                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mr-2">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
//                                                         <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
//                                                         <path d="m9 12 2 2 4-4"></path>
//                                                     </svg>
//                                                 </div>
//                                             )}
//                                             <div
//                                                 className={`p-4 rounded-2xl max-w-[85%] md:max-w-[75%] ${message.role === 'user'
//                                                         ? 'bg-blue-600 text-white rounded-br-none shadow-md'
//                                                         : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-bl-none border border-gray-200 dark:border-gray-700'
//                                                     }`}
//                                             >
//                                                 {typeof message.content === 'string' ? (
//                                                     <p className="whitespace-pre-wrap">{message.content}</p>
//                                                 ) : (
//                                                     message.content
//                                                 )}
//                                                 <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
//                                                     {formatDate(timestamp)}
//                                                 </div>
//                                             </div>
//                                             {message.role === 'user' && (
//                                                 <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0 ml-2">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
//                                                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                                         <circle cx="12" cy="7" r="4"></circle>
//                                                     </svg>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     );
//                                 })
//                             )}
//                             <div ref={messagesEndRef} />
//                         </div>
//                     </div>

//                     {/* Scroll to bottom button */}
//                     {showScrollButton && (
//                         <button
//                             onClick={scrollToBottom}
//                             className="absolute bottom-20 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
//                             aria-label="Scroll to bottom"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polyline points="6 9 12 15 18 9"></polyline>
//                             </svg>
//                         </button>
//                     )}

//                     {/* Input area */}
//                     <div className="border-t bg-white dark:bg-gray-800 p-4 shadow-md">
//                         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
//                             <SearchInput
//                                 placeholder="Describe your process or ask a question..."
//                                 value={inputValue}
//                                 onChange={(e) => setInputValue(e.target.value)}
//                                 className="flex-1"
//                             />
//                             <Button
//                                 type="submit"
//                                 disabled={isLoading || !inputValue.trim()}
//                                 className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 flex items-center justify-center min-w-[80px]"
//                             >
//                                 {isLoading ? (
//                                     <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                                 ) : (
//                                     <>
//                                         <span>Send</span>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
//                                             <line x1="22" y1="2" x2="11" y2="13"></line>
//                                             <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//                                         </svg>
//                                     </>
//                                 )}
//                             </Button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// src/components/ui/chat-interface.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Button } from './button';
import { SearchInput } from './search-input';
// Removed unused import MarkdownResponse

interface Message {
    role: 'user' | 'assistant';
    content: string | React.ReactNode;
    timestamp?: Date;
}

interface ChatInterfaceProps {
    messages: Message[];
    inputValue: string;
    setInputValue: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading?: boolean;
}

export function ChatInterface({
    messages,
    inputValue,
    setInputValue,
    handleSubmit,
    isLoading = false
}: ChatInterfaceProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Check scroll position to show/hide scroll button
    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
            setShowScrollButton(isNotAtBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-[100vh] bg-gray-50 dark:bg-gray-900">
            {/* Header with enhanced UI */}
            <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Process Optimizer</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered business efficiency assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Online
                        </span>
                    </div>
                </div>
            </header>

            {/* Side column for larger screens */}
            <div className="flex flex-1 overflow-hidden">
                <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">How to use</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start space-x-2">
                                <span className="flex-shrink-0 mt-0.5 bg-blue-100 text-blue-600 rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">Describe your business process</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="flex-shrink-0 mt-0.5 bg-blue-100 text-blue-600 rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                        <path d="m9 12 2 2 4-4"></path>
                                    </svg>
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">Get optimization suggestions</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="flex-shrink-0 mt-0.5 bg-blue-100 text-blue-600 rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">Ask follow-up questions</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick prompts</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setInputValue("Help me optimize my customer onboarding process")}
                                className="text-left w-full p-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition"
                            >
                                Customer onboarding process
                            </button>
                            <button
                                onClick={() => setInputValue("How can I improve my inventory management?")}
                                className="text-left w-full p-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition"
                            >
                                Inventory management
                            </button>
                            <button
                                onClick={() => setInputValue("Optimize my software development lifecycle")}
                                className="text-left w-full p-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition"
                            >
                                Software development cycle
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main chat area with custom scrollbar */}
                <div className="flex-1 flex flex-col">
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto px-4 py-6 md:px-6 custom-scrollbar"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#CBD5E0 #F1F5F9'
                        }}
                    >
                        <div className="max-w-3xl mx-auto space-y-6">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full space-y-8">
                                    <div className="bg-blue-600 text-white rounded-full p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                            <path d="m9 12 2 2 4-4"></path>
                                        </svg>
                                    </div>
                                    <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 max-w-lg">
                                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Welcome to Process Optimizer</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">Describe your business process, and I&apos;ll provide optimization recommendations to improve efficiency and reduce costs.</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                            <button
                                                onClick={() => setInputValue("Help me optimize my customer support process")}
                                                className="text-left p-3 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                </svg>
                                                Customer support
                                            </button>
                                            <button
                                                onClick={() => setInputValue("Optimize our order fulfillment process")}
                                                className="text-left p-3 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 17H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"></path>
                                                    <path d="M9 17v-6"></path>
                                                    <path d="M15 17v-2"></path>
                                                    <path d="M12 17v-4"></path>
                                                </svg>
                                                Order fulfillment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message, index) => {
                                    // Add timestamp to message if not present
                                    const timestamp = message.timestamp || new Date();

                                    return (
                                        <div
                                            key={index}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {message.role === 'assistant' && (
                                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                                        <path d="m9 12 2 2 4-4"></path>
                                                    </svg>
                                                </div>
                                            )}
                                            <div
                                                className={`p-4 rounded-2xl max-w-[85%] md:max-w-[75%] ${message.role === 'user'
                                                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-bl-none border border-gray-200 dark:border-gray-700'
                                                    }`}
                                            >
                                                {typeof message.content === 'string' ? (
                                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                                ) : (
                                                    message.content
                                                )}
                                                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                                    {formatDate(timestamp)}
                                                </div>
                                            </div>
                                            {message.role === 'user' && (
                                                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0 ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Scroll to bottom button */}
                    {showScrollButton && (
                        <button
                            onClick={scrollToBottom}
                            className="absolute bottom-20 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                            aria-label="Scroll to bottom"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    )}

                    {/* Input area */}
                    <div className="border-t bg-white dark:bg-gray-800 p-4 shadow-md">
                        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                            <SearchInput
                                placeholder="Describe your process or ask a question..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 flex items-center justify-center min-w-[80px]"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Send</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}