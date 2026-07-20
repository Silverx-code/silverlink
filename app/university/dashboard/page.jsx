'use client';

import { useEffect, useState } from 'react';
import {
  getMyUniversity, getMyUniversityStats, getMyStudents, getRecommendedCompanies,
} from '../../../src/api/coordinator';
import LoadingScreen from '../../../src/components/LoadingScreen';
import ProtectedRoute from '../../../src/components/ProtectedRoute';

function CoordinatorDashboardContent() {
  const [university, setUniversity] = useState(null);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMyUniversity(), getMyUniversityStats(), getMyStudents(), getRecommendedCompanies(),
    ]).then(([uniRes, statsRes, studentsRes, companiesRes]) => {
      setUniversity(uniRes.data);
      setStats(statsRes.data);
      setStudents(studentsRes.data);
      setCompanies(companiesRes.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen label="Loading university portal..." />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">{university?.university_name}</h1>
      <p className="text-gray-500 mb-8">{university?.full_name} · {university?.title}</p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="card text-center">
          <p className="text-2xl font-heading font-bold text-primary">{stats?.student_count}</p>
          <p className="text-xs text-gray-400 mt-1">Registered students</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-heading font-bold text-primary">{stats?.application_count}</p>
          <p className="text-xs text-gray-400 mt-1">Applications sent</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-heading font-bold text-primary">{stats?.accepted_count}</p>
          <p className="text-xs text-gray-400 mt-1">Placements secured</p>
        </div>
      </div>

      <h2 className="font-heading text-lg font-semibold mb-3">Recommended companies for your students</h2>
      <p className="text-sm text-gray-400 mb-4">
        Ranked by how many of your students study a department these companies are currently accepting.
      </p>
      {companies.length === 0 ? (
        <p className="text-gray-400 text-sm mb-10">No matches yet — encourage students to complete their profiles.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {companies.map((c) => (
            <div key={c.id} className="card">
              <div className="flex items-center justify-between">
                <p className="font-medium">{c.name}</p>
                <span className="badge-accepting">{c.matching_student_count} students match</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{c.industry}</p>
              <p className="text-xs text-gray-400 mt-1">{(c.matched_departments || []).join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-heading text-lg font-semibold mb-3">Students</h2>
      {students.length === 0 ? (
        <p className="text-gray-400 text-sm">No students registered from your university yet.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Department</th>
                <th className="pb-2 pr-4">Level</th>
                <th className="pb-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 pr-4">{s.full_name}</td>
                  <td className="py-2 pr-4">{s.department}</td>
                  <td className="py-2 pr-4">{s.level}</td>
                  <td className="py-2 text-gray-500">{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function CoordinatorDashboardPage() {
  return (
    <ProtectedRoute roles={['coordinator']}>
      <CoordinatorDashboardContent />
    </ProtectedRoute>
  );
}
