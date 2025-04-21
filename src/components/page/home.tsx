'use client';
import {Navbar} from '@/components/self/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownRenderer from '@/components/self/MarkdownRenderer';
import Solvinger from './Solvinger';

const Hello = () => {

  const [code, setCode] = useState('');
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const reviewCode = async (
    code: string,
    setReview: React.Dispatch<React.SetStateAction<string | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    setLoading(true);

    try {
      const response = await axios.post (
        'https://solvinger-v1.onrender.com/ai/get-review',
        { code }
      );
      console.log(response.data)

      setInp(code)
      const message = response.data || 'No review received.';
      setReview(message);



      setCode('')
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
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [code]);

  const handleSend = () => {
    const trimmedInput = code.trim(); // Trim the input value

    // Ensure that there is a valid input before proceeding
    if (!trimmedInput) {
      toast.warn("Please write your message.");
      return; // Don't proceed if there's no input
    }

    // Call reviewCode with the trimmed input
    reviewCode(trimmedInput, setReview, setLoading);
    console.log("Input sent to review:", trimmedInput); // Log the input for debugging
  };

  return (
    <div className='dark:bg-black'>
      <Navbar />
      <div>
        <div className='h-[420px] overflow-y-scroll p-10 dark:text-white'>
          {!review ? <Solvinger /> : (<>
            <div className='flex flex-col items-end mb-3'>

               <div className="flex justify-center mt-10">
      <MarkdownRenderer message={inp} />
    </div>
            </div>
            <MarkdownRenderer message={review} />
          </>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl p-4 border rounded-lg shadow-sm  flex flex-col gap-2 mx-4">
            <div className="flex items-end gap-2 bg-white dark:bg-black dark:text-white">
              <textarea
                ref={textareaRef}
                className="flex-1 resize-none overflow-hidden overflow-y-scroll border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[3rem] max-h-40 dark:bg-black dark:text-white bg-white"
                placeholder="Type your message..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
              />
              {!code.trim() ? (
                ''
              ) : (
                <button
                  onClick={handleSend}
                  className={`p-2 text-white rounded-md transition-colors duration-200 ${code.trim() && !loading
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  aria-label="Send message"
                  disabled={!code.trim() || loading}
                >

                  {loading ? (
                    <div className="flex items-center gap-1">
                      <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-6 h-6"></span>
                    </div>
                  ) : (
                    'Send'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-center md:py-5 lg:py-1 py-3 dark:text-white '>
          <p>Ai may make mistakes. so double-check it.</p>
        </div>
      </div>
    </div>
  )
}

export default Hello