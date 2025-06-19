// src/components/ui/markdown-response.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownResponseProps {
  content: string;
}

export function MarkdownResponse({ content }: MarkdownResponseProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        components={{
        h1: (props) => <h1 className="text-2xl font-bold mt-6 mb-3" {...props} />,
        h2: (props) => <h2 className="text-xl font-bold mt-5 mb-2" {...props} />,
        h3: (props) => <h3 className="text-lg font-bold mt-4 mb-1" {...props} />,
        h4: (props) => <h4 className="text-base font-bold mt-3 mb-1" {...props} />,
        p: (props) => <p className="mb-3 leading-relaxed" {...props} />,
        ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
        ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
        li: (props) => <li className="mb-1" {...props} />,
        strong: (props) => <strong className="font-bold text-blue-700 dark:text-blue-300" {...props} />,
        em: (props) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
        blockquote: (props) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:text-gray-400 my-4" {...props} />
        ),
        hr: (props) => <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />,
        table: (props) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
          </div>
        ),
        thead: (props) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
        tbody: (props) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800" {...props} />,
        tr: (props) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-900" {...props} />,
        th: (props) => <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300" {...props} />,
        td: (props) => <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400" {...props} />,
        code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="rounded-md overflow-hidden my-4">
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                wrapLines={true}
                showLineNumbers={true}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
              {children}
            </code>
          );
        },
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}