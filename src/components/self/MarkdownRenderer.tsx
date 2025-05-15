'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy } from 'lucide-react';
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
          <code className="bg-gray-200 dark:bg-gray-200/30 px-1 py-0.5 rounded text-sm font-mono">
            {codeText}
          </code>
        );
      }

      return (
        <div className="relative dark:bg-[#1e1e1e] border-gray-300 dark:border-none border rounded-md overflow-hidden mb-4 w-full max-w-full md:max-w-4xl">
          <div className="flex items-center justify-between text-xs px-4 py-2 dark:bg-[#2d2d2d] bg-[#ddd] dark:text-white font-mono">
            <span className="lowercase">{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(codeText)}
              className="dark:text-white sticky top-10 hover:cursor-pointer flex transition text-xs"
            >
             <Copy className='h-2'/> Copy
            </button>
          </div>
          <div className="overflow-auto dar:bg-[#171717]">
            <pre className="p-4 text-sm  whitespace-pre! language-javascript break-words">
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
    <div className="w-full min-w-[15rem] max-w-[20rem] md:max-w-[20rem] lg:max-w-3xl p-4 dark:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {message}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
