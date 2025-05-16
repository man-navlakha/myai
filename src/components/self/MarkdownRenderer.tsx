'use client';

import React, { useEffect, useRef } from 'react';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Choose a theme

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

       const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [codeText, language]); // Re-run when code or language changes


      if (isInline) {
        return (
          <code className="bg-gray-200 dark:bg-gray-200/30 px-1 py-0.5 rounded text-sm font-mono">
            {codeText}
          </code>
        );
      }

      return (
        <div className="relative bg-[#1e1e1e] border-gray-300 dark:border-none border rounded-md overflow-hidden mb-4 w-full max-w-full my-2 md:max-w-4xl">
          <div className="flex items-center justify-between text-xs px-4 py-2 bg-[#2d2d2d] text-white font-mono">
            <span className="lowercase">{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(codeText)}
              className="dark:text-white sticky top-10 hover:cursor-pointer flex transition text-xs"
            >
             <Copy className='h-4'/> Copy
            </button>
          </div>
          <div className="overflow-auto dark:bg-[#171717]">
              <pre><code ref={codeRef} className={`language-${language} dark:bg-[#171717]`}>{codeText}</code></pre>
            {/* <pre className="p-4 text-sm  whitespace-pre! language-javascript break-words">
              <code className={`language-${language}`}>{codeText}</code>
            </pre> */}
          </div>
        </div>
      );
    },
    strong: ({ children }) => <h1 className="font-semibold my-2 ">{children}</h1>,
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
