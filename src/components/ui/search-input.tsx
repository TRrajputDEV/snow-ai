// 'use client'

// import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react'

// interface SearchInputProps {
//     onSearch: (value: string) => void
//     placeholder?: string
//     className?: string
// }

// export default function SearchInput({ onSearch, placeholder = 'Search...', className = '' }: SearchInputProps) {
//     const [value, setValue] = useState('')
//     const [placeholders, setPlaceholders] = useState<string[]>([
//         'Describe how you handle customer onboarding...',
//         'Tell me about your inventory management process...',
//         'How do you handle support ticket escalation?',
//         'Describe your sales pipeline process...'
//     ])
//     const [currentPlaceholder, setCurrentPlaceholder] = useState('')
//     const [placeholderIndex, setPlaceholderIndex] = useState(0)
//     const [charIndex, setCharIndex] = useState(0)
//     const [isDeleting, setIsDeleting] = useState(false)
//     const [pause, setPause] = useState(false)

//     const inputRef = useRef<HTMLInputElement>(null)

//     // Handle typing animation
//     useEffect(() => {
//         if (pause) {
//             const pauseTimeout = setTimeout(() => {
//                 setPause(false)
//                 setIsDeleting(true)
//             }, 1500)
//             return () => clearTimeout(pauseTimeout)
//         }

//         const typingInterval = setInterval(() => {
//             const currentText = placeholders[placeholderIndex]

//             if (isDeleting) {
//                 if (charIndex > 0) {
//                     setCharIndex(charIndex - 1)
//                     setCurrentPlaceholder(currentText.substring(0, charIndex - 1))
//                 } else {
//                     setIsDeleting(false)
//                     setPlaceholderIndex((placeholderIndex + 1) % placeholders.length)
//                 }
//             } else {
//                 if (charIndex < currentText.length) {
//                     setCharIndex(charIndex + 1)
//                     setCurrentPlaceholder(currentText.substring(0, charIndex + 1))
//                 } else {
//                     setPause(true)
//                 }
//             }
//         }, isDeleting ? 30 : 70)

//         return () => clearInterval(typingInterval)
//     }, [charIndex, isDeleting, pause, placeholderIndex, placeholders])

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value)
//     }

//     const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter' && value.trim()) {
//             onSearch(value)
//         }
//     }

//     const handleFocus = () => {
//         if (inputRef.current) {
//             inputRef.current.placeholder = ''
//         }
//     }

//     const handleBlur = () => {
//         if (inputRef.current && !value) {
//             inputRef.current.placeholder = currentPlaceholder
//         }
//     }

//     return (
//         <div className={`relative w-full ${className}`}>
//             <input
//                 ref={inputRef}
//                 type="text"
//                 value={value}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//                 placeholder={currentPlaceholder}
//                 className="w-full p-4 pl-5 pr-12 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//             <button
//                 onClick={() => value.trim() && onSearch(value)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
//                 aria-label="Search"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//             </button>
//         </div>
//     )
// }

// src/components/ui/search-input.tsx
import React from 'react';

export interface SearchInputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export function SearchInput({ placeholder, value, onChange, className = '' }: SearchInputProps) {
    return (
        <div className={`relative w-full ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
        </div>
    );
}