'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';

interface MarkdownRendererProps {
  message: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ message }) => {
  const components: Components = {
    ul: ({ children }) => (
      <ul className="list-disc pl-6 my-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 my-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-base">{children}</li>,
    code({ className, children }) {
      const codeText = String(children).trim();
      const language = className?.replace('language-', '') || 'text';
      const isInline = !className;

      if (isInline) {
        return (
          <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm font-mono">
            {codeText}
          </code>
        );
      }

      return (
        <div className="relative bg-[#1e1e1e] rounded-md overflow-hidden mb-4 w-full max-w-full md:max-w-4xl">
          <div className="flex items-center justify-between text-xs px-4 py-2 bg-[#2d2d2d] text-white font-mono">
            <span className="lowercase">{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(codeText)}
              className="text-white hover:text-green-400 transition text-xs"
            >
              Copy
            </button>
          </div>
          <div className="overflow-auto">
            <pre className="p-4 text-sm text-green-400 whitespace-pre-wrap break-words">
              <code className={`language-${language}`}>{codeText}</code>
            </pre>
          </div>
        </div>
      );
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    h3: ({ children }) => <h3 className="text-xl font-bold text-white mt-4 mb-2">{children}</h3>,
  };

  return (
    <div className="w-full min-w-[15rem] max-w-[20rem] md:max-w-[20rem] lg:max-w-3xl p-4 border rounded-lg shadow-sm bg-blue-900/30 dark:bg-gray-100/30 dark:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {message}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
