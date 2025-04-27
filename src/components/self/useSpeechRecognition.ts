import { useEffect, useRef, useState } from 'react';

const getSpeechRecognition = () => {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
};

export const useSpeechRecognition = () => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const speechResult = event.results[event.results.length - 1][0].transcript;
      setTranscript(speechResult);
    };

    recognition.onerror = (event: any) => {
    //   console.error('SpeechRecognition error:', event.error);

      if (event.error === 'not-allowed') {
        setError('Microphone access was denied. Please allow permission to use voice input.');
      } else if (event.error === 'no-speech') {
        setError('No speech was detected. Please try again.');
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please connect a microphone.');
      } else if (event.error === 'aborted') {
        setError(null);
      } else {
        setError('Speech recognition error: ' + event.error);
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      if (recognitionRef.current?.listening) {
        recognition.start(); // Restart if still listening
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setError('SpeechRecognition is not supported.');
      return;
    }

    if (!isListening) {
      setTranscript('');
      setError(null); // Clear previous error
      recognition.listening = true;
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        setError('Failed to start voice recognition.');
        // console.error(err);
      }
    } else {
      recognition.listening = false;
      recognition.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    error,
    startListening,
  };
};
