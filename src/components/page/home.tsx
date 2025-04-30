'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from "@/components/self/Navbar";
import MarkdownRenderer from '@/components/self/MarkdownRenderer';
import Solvinger from './Solvinger';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'react-toastify/dist/ReactToastify.css';
import { Mic, Send } from 'lucide-react';
import Sidebar from '@/components/self/Sidebar';

const Hello = () => {
  const [code, setCode] = useState('');
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string | null>(null);
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

  // // Automatically update the input with spoken text
  // useEffect(() => {
  //   if (transcript) {
  //     setCode((prev) => (prev ? prev + ' ' + transcript : transcript));
  //   }
  // }, [transcript]);

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
    try {
      const response = await axios.post('https://solvinger-v1.onrender.com/ai/get-review', {
        code: codeToReview,
      });

      const result = response.data || 'No review received.';
      setInp(codeToReview);
      setReview(result);
      setCode('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || error.message;
        setReview('Error while reviewing the code: ' + errorMsg);
      } else {
        setReview('An unexpected error occurred.');
      }
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
        <div className="flex-1 min-h-[320px] max-h-scree md:max-h-[95vh] overflow-y-auto px-6 py-4">
          {!review ? (
            <Solvinger onItemClick={(text: string) => setCode(text)} />
          ) : (
            <>
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="w-full max-w-3xl">
                  <MarkdownRenderer message={inp} />
                </div>
              </div>
              <div className="w-full max-w-3xl mx-auto">
                <MarkdownRenderer message={review} />
              </div>
            </>
          )}
        </div>

        {/* Input Panel */}
        <div className="w-full sticky bottom-0 px-4 py-3 mt-5">
          <div className="max-w-4xl mx-auto flex flex-col gap-3 rounded-xl p-4 shadow-md border border-white/20 bg-white/10 backdrop-blur-lg dark:border-white/10">

            <div className="flex flex-col sm:flex-row  gap-3">
              <textarea
                ref={textareaRef}
                className="flex-1 w-full resize-none text-black overflow-y-auto rounded-lg p-3 min-h-[4rem] max-h-40 bg-white/20 dark:bg-black/30 border dark:border-white/30 border-black/30 text-black dark:text-white dark:placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-gradient"
                placeholder="Type your message..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
              />

              <div className="flex gap-2 items-center justify-between">
                <button
                  onClick={handleToggleListening}
                  aria-label="Toggle voice input"
                  className={`p-3 rounded-xl border transition ${listening
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 hover:bg-gray-300/30 dark:hover:bg-white/30 text-black dark:text-white'
                    } dark:border-white/20`}
                >
                  <Mic />
                </button>

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
              AI may make mistakes. Always verify responses.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Hello;
