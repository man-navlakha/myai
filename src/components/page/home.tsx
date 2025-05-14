'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from "@/components/self/Navbar";
import MarkdownRenderer from '@/components/self/MarkdownRenderer';
import Solvinger from './Solvinger';
import WaveVisualizer from '@/components/self/WaveVisualizer'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'react-toastify/dist/ReactToastify.css';
import { Mic, Send } from 'lucide-react';
import Sidebar from '@/components/self/Sidebar';

const Hello = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', message: string }[]>([]);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // const escapeHtml = (unsafe: string) => {
  //   return unsafe
  //     .replace(/&/g, "&amp;")
  //     .replace(/</g, "&lt;")
  //     .replace(/>/g, "&gt;");
  // };
  // const formatMessageContent = (content: string, references?: { pageNumber: number }[]) => {
  //   if (!content) return "";

  //   let formatted = escapeHtml(content);

  //   // Format code blocks: ```lang\ncode\n```
  //   formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
  //     const language = lang || "text";
  //     const escapedCode = escapeHtml(code);

  //     // Create the formatted HTML with a "Copy" button
  //     return `
  //     <div className="relative bg-[#1e1e1e] rounded-md overflow-hidden mb-4 w-full max-w-full md:max-w-4xl">
  //       <div className="flex items-center justify-between text-xs px-4 py-2 bg-[#2d2d2d] text-white font-mono">
  //         <span className="lowercase">${language}</span>
  //         <div className="flex gap-2">
  //           <button className="copy-code-button text-white hover:text-green-400 transition" data-code="${encodeURIComponent(code)}">Copy</button>
  //         </div>
  //       </div>
  //       <div className="overflow-auto">
  //         <pre className="p-4 text-sm text-green-400 whitespace-pre-wrap break-words">
  //           <code className="language-${language}">${escapedCode}</code>
  //         </pre>
  //       </div>
  //     </div>
  //     `;
  //   });

  //   // Format ### headers as h3 titles
  //   formatted = formatted.replace(/^### (.*)$/gm, `<h3 className="text-xl font-bold text-white mt-4 mb-2">$1</h3>`);

  //   // Format bold: **text**
  //   formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  //   // Format inline code: `code`
  //   formatted = formatted.replace(/`([^`]+?)`/g, `<code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm">$1</code>`);

  //   // Highlight page references like [P5]
  //   if (references) {
  //     references.forEach((ref) => {
  //       const pageRef = `[P${ref.pageNumber}]`;
  //       formatted = formatted.replace(
  //         escapeHtml(pageRef),
  //         `<span className="text-blue-400 font-semibold">${pageRef}</span>`
  //       );
  //     });
  //   }

  //   return formatted;
  // };



  // Sync transcript to code while listening
  useEffect(() => {
    if (!listening) return;

    if (transcript !== lastTranscript) {
      const newText = transcript.replace(lastTranscript, '');
      setCode((prev) => prev + newText);
      setLastTranscript(transcript);
    }
  }, [transcript, lastTranscript, listening]);

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      if (browserSupportsSpeechRecognition) {
        resetTranscript(); // Start fresh
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [code]);

  const handleSend = () => {
    const trimmedInput = code.trim();
    
    if (!trimmedInput) {
      toast.warn("Please write your message.");
      return;
    }
    reviewCode(trimmedInput);
  };

  const reviewCode = async (codeToReview: string) => {
    setLoading(true);
    SpeechRecognition.stopListening();
    try {
      setChatHistory(prev => [...prev, { role: 'user', message: codeToReview }]);

      const response = await axios.post('https://solvinger-v1.onrender.com/ai/get-review', {
        code: codeToReview,
      });

      const result = response.data || 'No review received.';
      setChatHistory(prev => [...prev, { role: 'assistant', message: result }]);
      setCode('');
    } catch (error) {
      const errorMsg = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : 'An unexpected error occurred.';
      setChatHistory(prev => [...prev, { role: 'assistant', message: `Error: ${errorMsg}` }]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

        {/* Scrollable Content Section */}
        <div className="w-full max-w-3xl md:max-w-[20rem] lg:max-w-3xl mx-auto flex flex-col gap-4 py-5 px-5">
          {chatHistory.length === 0 && (
            <Solvinger onItemClick={(text: string) => setCode(text)} />
          )}

          {chatHistory.map((entry, idx) => (
            <div key={idx} className={`p-3 rounded-md ${entry.role === 'user' ? 'bg-blue-100 dark:bg-blue-900 self-end' : 'bg-gray-100 dark:bg-gray-800 self-start'}`}>
              <MarkdownRenderer message={entry.message} />
            </div>
          ))}
        </div>


        {/* Input Panel */}
        <div className="w-full sticky  bottom-0 px-4 py-3 mt-5">
          <div className="max-w-4xl overflow-hidden mx-auto flex flex-col gap-3 rounded-xl p-4 shadow-md border border-black/20 dark:border-white/20 bg-white/10 backdrop-blur-lg">

            <div className="flex flex-col sm:flex-row gap-3">
            
              <textarea
                ref={textareaRef}
                className="flex-1 w-full resize-none text-black overflow-y-auto rounded-lg p-3 min-h-[4rem] max-h-40 bg-white/20 dark:bg-black/30 border dark:border-white/30 border-black/30 text-black dark:text-white dark:placeholder:text-white/60 textarea-wrapper "
                placeholder="Type your message..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                />

              <div className="flex gap-2 items-center justify-between">
                <div className="relative flex flex-col items-center">

                  <button
                    onClick={handleToggleListening}
                    aria-label="Toggle voice input"
                    className={`mic-button p-3 rounded-xl border overflow-hidden transition ${listening
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 hover:bg-gray-300/30 dark:hover:bg-white/30 text-black dark:text-white'
                      } dark:border-white/20 `}
                  >
                    {listening && <WaveVisualizer />}
                    <div className="relative z-10">
                      <Mic />
                    </div>
                  </button>
                </div>
{/* 
                <>
                  {code.trim() && (
                  // <button
                  // onClick={handleSend}
                  // disabled={loading}
                  // aria-label="Send message"
                  // className={`p-3 rounded-xl transition ${loading
                  //   ? 'bg-gray-400 cursor-not-allowed text-white'
                  //   : 'bg-blue-600 hover:bg-blue-700 text-white'
                  // }`}
                  // >
                  //   {loading ? (
                  //     <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
                  //   ) : (
                  //     <Send />
                  //   )}
                  // </button>





                  // <div className="relative group " onClick={handleSend}>
                  //   <div
                  //     className={`relative ${loading ? 'move-wi' : 'w-34'} w-34  h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10`}
                  //   >
                  //     <div
                  //       className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transistion-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"
                  //     ></div>
                  
                  //     <div
                  //       className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black"
                  //     >
                  //       <button
                          
                  //         disabled={loading}
                  //         aria-label="Send message"
                  //         name="text"
                  //         className={`input ${loading ? 'move-right ' : 'px-9 py-3'} flex justify-center items-center font-semibold text-lg h-full opacity-90 w-full  rounded-xl bg-black`}
                  //       >
                  //        {loading ? <div className='flex justify-center items-center'>Sending...
                  //        <svg width="64px" height="64px" viewBox="-7.92 -7.92 39.84 39.84" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.384"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 9H3.5" stroke="#0095FF" stroke-width="1.224" stroke-linecap="round"></path> <path d="M5 15L4 15" stroke="#0095FF" stroke-width="1.224" stroke-linecap="round"></path> <path d="M4 12H2" stroke="#0095FF" stroke-width="1.224" stroke-linecap="round"></path> <path d="M12.0409 12.7649C12.4551 12.7649 12.7909 12.4291 12.7909 12.0149C12.7909 11.6007 12.4551 11.2649 12.0409 11.2649V12.7649ZM9.26797 12.7649H12.0409V11.2649H9.26797V12.7649Z" fill="#0095FF"></path> <path d="M11.8369 4.80857L12.1914 4.14766L11.8369 4.80857ZM20.5392 9.47684L20.1846 10.1377L20.5392 9.47684ZM20.5356 14.5453L20.8891 15.2068L20.5356 14.5453ZM11.8379 19.1934L11.4844 18.5319H11.4844L11.8379 19.1934ZM8.13677 15.7931L7.41828 15.578L8.13677 15.7931ZM8.13127 8.2039L7.41256 8.41827L8.13127 8.2039ZM9.18255 11.7286L8.46384 11.9429L9.18255 11.7286ZM11.4823 5.46948L20.1846 10.1377L20.8937 8.81593L12.1914 4.14766L11.4823 5.46948ZM20.1821 13.8839L11.4844 18.5319L12.1914 19.8548L20.8891 15.2068L20.1821 13.8839ZM8.85526 16.0082L9.90074 12.5163L8.46376 12.0861L7.41828 15.578L8.85526 16.0082ZM9.90126 11.5142L8.84998 7.98954L7.41256 8.41827L8.46384 11.9429L9.90126 11.5142ZM11.4844 18.5319C10.7513 18.9237 9.98824 18.7591 9.44091 18.2563C8.88829 17.7486 8.58451 16.9125 8.85526 16.0082L7.41828 15.578C6.97411 17.0615 7.47325 18.4855 8.4261 19.3609C9.38423 20.2411 10.8292 20.5828 12.1914 19.8548L11.4844 18.5319ZM20.1846 10.1377C21.6065 10.9005 21.6046 13.1236 20.1821 13.8839L20.8891 15.2068C23.3683 13.8819 23.3707 10.1447 20.8937 8.81593L20.1846 10.1377ZM12.1914 4.14766C10.8301 3.41739 9.38432 3.75692 8.42486 4.63604C7.47072 5.5103 6.96983 6.93392 7.41256 8.41827L8.84998 7.98954C8.5801 7.08467 8.88494 6.24894 9.43821 5.74199C9.98618 5.23991 10.7495 5.07638 11.4823 5.46948L12.1914 4.14766ZM9.90074 12.5163C9.9986 12.1895 9.99878 11.8412 9.90126 11.5142L8.46384 11.9429C8.47777 11.9896 8.47774 12.0394 8.46376 12.0861L9.90074 12.5163Z" fill="#ffffff"></path> </g></svg>
                  //        </div>
                  //         : 'Send'}
                  //       </button>
                  //     </div>
                  //     <div
                  //       className={`absolute ${loading ? 'duration-1000 animate-spin' : ''} w-full h-[100px] bg-gradient-to-r from-blue-700 to-rose-700 blur-[30px]`}></div>
                  //   </div>
                  // </div>
                  







                  )}
                </>
 */}





                {code.trim() && (
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    aria-label="Send message"
                    className={`p-3 rounded-xl transition ${loading
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    {loading ? (
                      <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
                    ) : (
                      <Send />
                    )}
                  </button>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-black/70 dark:text-white/50 mt-2">
              Solvinger may make mistakes. Always verify responses.
            </p>
      <div className="blur-3xl w-[70%] rounded-full h-28 absolute -bottom-28 bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500" ></div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Hello;
