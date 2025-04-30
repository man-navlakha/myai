import { Suspense } from 'react';
import GetReviewClient from '@/components/self/GetReviewClient';

const GetReviewPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GetReviewClient />
    </Suspense>
  );
};

export default GetReviewPage;
