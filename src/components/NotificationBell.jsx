'use client';

import { useEffect, useRef, useState } from 'react';
import { getNotifications, markNotificationRead } from '../api/notifications';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef(null);

  const load = () => {
    getNotifications().then((res) => {
      setNotifications(res.data);
      setUnreadCount(res.meta.unreadCount);
    });
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000); // light polling; sockets handle live chat separately
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const onOpen = () => {
    setOpen((v) => !v);
  };

  const onRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={onOpen} className="relative p-2 rounded-lg hover:bg-gray-100">
        <span aria-hidden>🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-lg z-20 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-100 font-heading font-semibold text-sm">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-400 text-center">You&apos;re all caught up.</p>
          ) : (
            notifications.map((n) => (
              <button
                type="button"
                key={n.id}
                onClick={() => !n.is_read && onRead(n.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 last:border-0 ${n.is_read ? 'opacity-60' : 'bg-primary/5'}`}
              >
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
