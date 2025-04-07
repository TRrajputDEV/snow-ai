'use client'

import { useState } from 'react'
import SearchInput from './ui/search-input'
import { getProcessOptimization } from '@/lib/gemini-api'

interface ProcessFormProps {
    setResponse: (response: string) => void
    setLoading: (loading: boolean) => void
}

export default function ProcessForm({ setResponse, setLoading }: ProcessFormProps) {
    const [prompt, setPrompt] = useState('')

    const handleSearch = async (value: string) => {
        setPrompt(value)
        setLoading(true)
        try {
            const optimizationResponse = await getProcessOptimization(value)
            setResponse(optimizationResponse)
        } catch (error) {
            setResponse("Sorry, there was an error processing your request. Please try again.")
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full mb-6">
            <div className="mb-2 text-gray-300 text-sm">
                Describe a business process you want to optimize:
            </div>
            <SearchInput
                onSearch={handleSearch}
                className="w-full"
            />
            <div className="mt-2 text-gray-400 text-xs">
                Example: "Our customer onboarding takes 2 weeks and involves 5 departments manually approving documents"
            </div>
        </div>
    )
}