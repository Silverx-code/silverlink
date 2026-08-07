'use client';

import { useEffect, useState } from 'react';
import { getScraperLogs, getScraperStatus, runScraper } from '../api/admin';

function formatDate(value) {
  if (!value) return 'Never';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleString();
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-silver/15 bg-silver-light/30 p-3 dark:border-slate-700 dark:bg-slate-800/50">
      <p className="text-lg font-heading font-bold text-primary">{value ?? 0}</p>
      <p className="mt-1 text-xs text-silver-dark dark:text-slate-400">{label}</p>
    </div>
  );
}

export default function AdminScraperPanel() {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadStatus = async ({ includeLogs = false, preserveError = false } = {}) => {
    if (!preserveError) setError('');
    try {
      const response = await getScraperStatus();
      setStatus(response.data);
      if (includeLogs) {
        const logResponse = await getScraperLogs();
        setLogs(logResponse.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load scraper status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStatus(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRun = async () => {
    setRunning(true);
    setError('');
    setMessage('');
    try {
      const response = await runScraper();
      const result = response.data?.result;
      setMessage(
        `Scrape complete: ${result?.added || 0} added, ${result?.updated || 0} updated, ${result?.skipped || 0} skipped.`
      );
      await loadStatus({ includeLogs: showLogs });
    } catch (err) {
      setError(err.response?.data?.message || 'The scraper run failed. Check the logs and server configuration.');
      await loadStatus({ includeLogs: showLogs, preserveError: true });
    } finally {
      setRunning(false);
    }
  };

  const toggleLogs = async () => {
    const nextShowLogs = !showLogs;
    setShowLogs(nextShowLogs);
    if (nextShowLogs) await loadStatus({ includeLogs: true });
  };

  const latest = status?.latestRun;
  const stats = status?.stats;

  return (
    <section className="card space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading font-semibold">Opportunity scraper</h3>
          <p className="mt-1 max-w-2xl text-sm text-silver-dark dark:text-slate-400">
            Discover potential SIWES, internship, and graduate opportunities, then review the imported listings from the company management panel.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRun}
          disabled={loading || running}
          className="btn-primary shrink-0 text-sm py-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {running ? 'Running scraper…' : 'Run scraper now'}
        </button>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30">{error}</p>}
      {message && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/30">{message}</p>}

      {loading ? (
        <p className="text-sm text-silver-dark dark:text-slate-400">Loading scraper status…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Total listings" value={stats?.companies_found} />
            <Stat label="Scraper listings" value={stats?.scraper_companies} />
            <Stat label="Pending review" value={stats?.pending_review} />
          </div>

          <div className="rounded-xl border border-silver/15 p-4 text-sm dark:border-slate-700">
            {latest ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <p><span className="text-silver-dark dark:text-slate-400">Latest run:</span> <span className="font-medium capitalize">{latest.status}</span></p>
                <p><span className="text-silver-dark dark:text-slate-400">Started:</span> {formatDate(latest.started_at || latest.created_at)}</p>
                <p><span className="text-silver-dark dark:text-slate-400">Found:</span> {latest.companies_found || 0}</p>
                <p><span className="text-silver-dark dark:text-slate-400">Added / updated:</span> {(latest.companies_added || 0)} / {(latest.companies_updated || 0)}</p>
                {latest.errors && <p className="sm:col-span-2 text-red-600">Last error: {latest.errors}</p>}
              </div>
            ) : (
              <p className="text-silver-dark dark:text-slate-400">No scraper runs yet. Run it once to collect the first set of opportunities.</p>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={toggleLogs}
              className="text-sm font-medium text-primary hover:underline"
            >
              {showLogs ? 'Hide latest run log' : 'View latest run log'}
            </button>
            {showLogs && (
              <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-5 text-slate-100">
                {logs.length ? logs.join('\n') : 'No log entries are available for the latest run.'}
              </pre>
            )}
          </div>
        </>
      )}
    </section>
  );
}
