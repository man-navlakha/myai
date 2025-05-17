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
import { Mic, Send, Copy } from 'lucide-react';
import Sidebar from '@/components/self/Sidebar';

const Hello = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', message: string }[]>([]);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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
    <div className="flex min-h-screen dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : ''}`}>


        {/* Navbar */}
        <Navbar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

        {/* Scrollable Content Section */}
        <div className="w-full max-w-4xl min-h-[426px] md:max-w-[20rem] lg:max-w-4xl mx-auto flex flex-col gap-4 py-5 px-5">
          {chatHistory.length === 0 && (
            <Solvinger onItemClick={(text: string) => setCode(text)} />
          )}

          {chatHistory.map((entry, idx) => (
            <div key={idx} className={`px-3 py-1 rounded-3xl ${entry.role === 'user' ? 'bg-gray-400/30 dark:bg-gray-500/50 self-end ' : ' self-start'}`}>
              <MarkdownRenderer message={entry.message} />
             
            <div className={`flex  p-1 gap-1 ${entry.role === 'user' ? 'hidden' : 'visible'}`}>
  <div  onClick={() => navigator.clipboard.writeText(entry.message)} className="p-1 rounded-md hover:bg-gray-400/40 dark:hover:bg-gray-800/60 transition">
    <Copy className='h-5' />
  </div>
</div>

            </div>
          ))}
        </div>


        {/* Input Panel */}
        <div className="w-full sticky bg-gradient-to-b from-transparent via-transparent to-gray-400 dark:to-gray-800/100 bottom-0 px-2 py-3 min-h-10 mt-5 overflow-hidden">
          <div className="max-w-4xl overflow-hidden mx-auto flex flex-col gap-3 rounded-xl p-4 shadow-lg border border-black/20 dark:border-[white]/20 dark:bg-[#303030]/80 bg-white/60 backdrop-blur-lg z-2">

            <div className="flex flex-col sm:flex-row gap-3">
            
              <textarea
                ref={textareaRef}
                className="rounded w-full mb-3 text-black overflow-y-auto min-h-10 max-h-40 bg-white/0 z-2 dark:bg-[#303030]/0 border-none md:border-b outline-none dark:border-white/30 border-black/30 text-black dark:text-white dark:placeholder:text-white/60 textarea-wrapper "
                placeholder="Type your message..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={listening || loading}
                />

              <div className="flex gap-2 items-center items-end-safe justify-between">
                <div className="relative flex flex-col items-center">

                  <button
                    onClick={handleToggleListening}
                    aria-label="Toggle voice input"
                    className={`mic-button py-3 px-2 border-black/30 rounded-xl border overflow-hidden transition ${listening
                        ? 'bg-red-500 text-white '
                        : 'bg-white/20 hover:bg-gray-300/30 dark:hover:bg-white/30 text-black dark:text-white'
                      } dark:border-white/20 `}
                  >
                    {listening && <WaveVisualizer />}
                    <div className="relative z-10">
                      <Mic className='h-5' />
                    </div>
                  </button>
                </div>




                {code.trim() && (
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    aria-label="Send message"
                    className={`${listening ? 'hidden':''} py-3 px-2 rounded-xl transition  ${loading
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    {loading ? (
                      <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
                    ) : (
                      <Send className='h-5' />
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
            <p className="text-center text-[10px] text-black dark:text-white/50 mt-2">
              Solvinger may make mistakes. Always verify responses.
            </p>
      <div className={`{ -z-2 mrwave ${listening ?'bg-gradient-to-r from-pink-100 via-red-500 to-rose-800':`${code.trim() ? 'visible' : 'hidden'}`} blur-3xl w-[140%] -mx-4 rounded-full h-28 absolute -bottom-20 bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500`} ></div>
        </div>
      </div>
    </div>

  );
};

export default Hello;
