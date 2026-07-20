'use client';

import { useEffect, useState } from 'react';
import { getCaptchaChallenge } from '../api/captcha';

// A lightweight math challenge — no external script, no API key. Exposes the current
// token + answer up to the parent form via onChange so it can be submitted alongside
// the rest of the form fields.
export default function Captcha({ onChange }) {
  const [question, setQuestion] = useState('');
  const [token, setToken] = useState('');
  const [answer, setAnswer] = useState('');

  const load = () => {
    getCaptchaChallenge().then((res) => {
      setQuestion(res.data.question);
      setToken(res.data.token);
      setAnswer('');
    });
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    onChange?.({ captchaToken: token, captchaAnswer: answer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, answer]);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-600 whitespace-nowrap">{question || 'Loading...'}</span>
      <input
        type="number"
        className="input"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="button" onClick={load} className="text-xs text-primary shrink-0">
        New question
      </button>
    </div>
  );
}
