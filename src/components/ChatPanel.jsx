'use client';

import { useEffect, useRef, useState } from 'react';
import { getMessages } from '../api/messages';
import { getSocket } from '../api/socket';
import { useAuth } from '../context/AuthContext';

export default function ChatPanel({ applicationId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    getMessages(applicationId).then((res) => {
      if (mounted) setMessages(res.data);
    });

    const socket = getSocket();
    socket.emit('chat:join', { applicationId }, (res) => {
      if (!mounted) return;
      if (res?.ok) setJoined(true);
      else setError(res?.error || 'Could not join this conversation');
    });

    const onMessage = (msg) => {
      if (msg.application_id === applicationId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on('chat:message', onMessage);

    return () => {
      mounted = false;
      socket.off('chat:message', onMessage);
    };
  }, [applicationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const socket = getSocket();
    socket.emit('chat:message', { applicationId, body: draft.trim() }, (res) => {
      if (!res?.ok) setError(res?.error || 'Message failed to send');
    });
    setDraft('');
  };

  return (
    <div className="card flex flex-col h-96">
      <h3 className="font-heading font-semibold mb-2 text-sm">
        Conversation {!joined && <span className="text-gray-400 font-normal">(connecting...)</span>}
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.length === 0 && <p className="text-sm text-gray-400">No messages yet — say hello.</p>}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
              m.sender_id === user?.id ? 'bg-primary text-white ml-auto' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {m.body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      <form onSubmit={send} className="flex gap-2 mt-3">
        <input
          className="input"
          placeholder="Type a message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="btn-primary shrink-0">Send</button>
      </form>
    </div>
  );
}
