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
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => {
      if (inline) {
        return (
          <code className="bg-gray-600 text-white dark:bg-gray-100 dark:text-black text-sm px-1 py-0.5 rounded">
            {children}
          </code>
        );
      }

      return (
        <pre className="bg-gray-600 text-white dark:bg-gray-100 dark:text-black px-3 py-4 my-4 rounded-sm overflow-x-auto text-sm">
          <code className={className} {...props}>
            {children}
          
          </code>
        </pre>
      );
    },
  };

  return (
    <div className="w-full max-w-2xl md:max-w-[20rem] lg:max-w-3xl p-4 border rounded-lg shadow-sm bg-blue-900/30 dark:bg-gray-100/30 dark:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {message}
        
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
