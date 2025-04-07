'use client'

import { useState } from 'react'
import SearchInput from '@/components/ui/search-input'
import { getProcessOptimization } from '@/lib/gemini-api'

export default function Home() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = async (value: string) => {
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

  const TestGeminiAPI = () => {
    const [testResult, setTestResult] = useState('');
    const [testing, setTesting] = useState(false);
    
    const testAPI = async () => {
      setTesting(true);
      setTestResult('Testing API connection...');
      
      try {
        const response = await getProcessOptimization('Test message: Please optimize a customer onboarding process.');
        setTestResult(`API Success! Response starts with: ${response.substring(0, 100)}...`);
      } catch (error: any) {
        setTestResult(`API Error: ${error.message}`);
      } finally {
        setTesting(false);
      }
    };
    
    return (
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <button 
          onClick={testAPI}
          disabled={testing}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
        >
          {testing ? 'Testing...' : 'Test Gemini API Connection'}
        </button>
        {testResult && (
          <div className="mt-2 p-2 bg-gray-700 rounded text-sm text-gray-300">
            {testResult}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-900">
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-white">
          Process <span className="text-blue-500">Optimizer</span>
        </h1>
        <p className="mb-12 text-lg text-center max-w-2xl text-gray-300">
          Optimize your business processes with AI. Describe your process and get recommendations on how to make it better and more efficient.
        </p>

        <div className="w-full">
          {/* Search Input */}
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

          {/* Response Section */}
          {(loading || response) && (
            <div className="w-full mt-8">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-blue-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Optimization Recommendations
                </h2>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-400">Analyzing your process and generating recommendations...</p>
                  </div>
                ) : (
                  <div className="max-w-none">
                    {response.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* API Testing Component */}
          <TestGeminiAPI />
        </div>
      </div>
    </main>
  )
}