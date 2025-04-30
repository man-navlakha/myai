'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GetReviewClient = () => {
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (codeToSend: string) => {
    setLoading(true);
    try {
      const res = await axios.post('https://solvinger-v1.onrender.com/ai/get-review', {
        code: codeToSend,
      });
      setResponse(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setResponse('Error: ' + err.message);
      } else {
        setResponse('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl) {
      setCode(codeFromUrl);
      handleSubmit(codeFromUrl);
    }
  }, [searchParams]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Code Review Request</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={60}
        placeholder="Paste your code here..."
        style={{ fontFamily: 'monospace', padding: '10px', width: '100%' }}
      />
      <br />
      <button onClick={() => handleSubmit(code)} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Submitting...' : 'Get Review'}
      </button>
      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', background: '#f0f0f0', padding: '1rem' }}>
        <strong>Response:</strong>
        <div>{response}</div>
      </div>
    </div>
  );
};

export default GetReviewClient;
