'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { verifyCompany } from '../../../src/api/auth';

export default function VerifyCompanyPage({ params }) {
  const { token } = params;
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyCompany(token)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'This verification link is invalid or has expired.');
      });
  }, [token]);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      {status === 'verifying' && <p className="text-gray-400">Verifying your company...</p>}
      {status === 'success' && (
        <>
          <h1 className="font-heading text-2xl font-bold mb-3">You&apos;re verified 🎉</h1>
          <p className="text-gray-500 mb-6">Your company profile is live. Log in to manage it.</p>
          <Link href="/login" className="btn-primary">Log in</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className="font-heading text-2xl font-bold mb-3">Verification failed</h1>
          <p className="text-gray-500">{message}</p>
        </>
      )}
    </div>
  );
}
