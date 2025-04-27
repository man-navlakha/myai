'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from '@/components/self/Navbar';
import MarkdownRenderer from '@/components/self/MarkdownRenderer';
import Solvinger from './Solvinger';
import { useSpeechRecognition } from '@/components/self/useSpeechRecognition';
import 'react-toastify/dist/ReactToastify.css';
import { Mic, Send } from 'lucide-react';

const Hello = () => {
  const [code, setCode] = useState('');
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string | null>(null);
  const { isListening, transcript, startListening, error } = useSpeechRecognition();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Automatically update the input with spoken text
  useEffect(() => {
    if (transcript) {
      setCode((prev) => (prev ? prev + ' ' + transcript : transcript));
    }
  }, [transcript]);

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
    } catch (error: any) {
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
    <div className="dark:bg-black min-h-screen">
      <Navbar />

      <div className="p-10 h-[420px] overflow-y-scroll dark:text-white">
        {!review ? (
          <Solvinger />
        ) : (
          <>
            <div className="flex flex-col items-end mb-3">
              <div className="flex justify-center mt-10">
                <MarkdownRenderer message={inp} />
              </div>
            </div>
            <MarkdownRenderer message={review} />
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <div className="flex justify-center w-full">
        <div className="w-full max-w-2xl p-4 border rounded-lg shadow-sm flex flex-col gap-2 mx-4">
          <div className="flex items-end gap-2 bg-white dark:bg-black dark:text-white">
            <textarea
              ref={textareaRef}
              className="flex-1 resize-none overflow-hidden overflow-y-scroll border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[3rem] max-h-40 dark:bg-black dark:text-white bg-white"
              placeholder="Type your message..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />

            <button
              onClick={startListening}
              className={`p-2 rounded ${isListening ? 'bg-red-500 text-white' : 'bg-blue-500/30'} dark:text-white text-black rounded-3xl`}
              aria-label="Toggle voice input"
            >
                  <Mic />

            </button>

            {code.trim() && (
              <button
                onClick={handleSend}
                disabled={loading}
                className={`p-2 text-white rounded-md transition-colors duration-200 ${
                  loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                aria-label="Send message"
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-6 h-6" />
                  </div>
                ) : (
                  <Send/>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center py-3 md:py-5 lg:py-1 dark:text-white">
        <p>AI may make mistakes. So double-check it.</p>
      </div>
    </div>
  );
};

export default Hello;
