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
    <div className="flex flex-wrap gap-2 items-center bg-silver-light/50 rounded-xl px-3 py-2.5">
      <span className="font-mono text-sm text-ink whitespace-nowrap">{question || 'Loading...'}</span>
      <input
        type="number"
        className="input w-24 py-1.5"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="button" onClick={load} className="text-xs text-primary hover:text-primary-dark shrink-0">
        New question
      </button>
    </div>
  );
}
