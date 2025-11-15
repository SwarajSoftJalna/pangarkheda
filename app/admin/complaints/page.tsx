'use client';

import { useEffect, useState } from 'react';

interface ComplaintItem {
  id: string;
  name: string;
  mobile: string;
  type: string;
  details: string;
  createdAt: string;
}

export default function ComplaintsAdminPage() {
  const [rows, setRows] = useState<ComplaintItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/complaints', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setRows(data.complaints || []);
      } catch (e) {
        console.error(e);
        setError('तक्रारी मिळवण्यात त्रुटी');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">लोड होत आहे...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">तक्रार नोंदी</h1>
            <span className="text-sm text-gray-500">एकूण: {rows.length}</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-700">
                  <th className="px-4 py-2 border">दिनांक</th>
                  <th className="px-4 py-2 border">नाव</th>
                  <th className="px-4 py-2 border">मोबाईल</th>
                  <th className="px-4 py-2 border">विषय</th>
                  <th className="px-4 py-2 border">तपशील</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">नोंदी उपलब्ध नाहीत</td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="text-sm hover:bg-gray-50">
                      <td className="px-4 py-2 border whitespace-nowrap">{new Date(r.createdAt).toLocaleString('mr-IN')}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">{r.name}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">{r.mobile}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">{r.type}</td>
                      <td className="px-4 py-2 border">{r.details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
