import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const History = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/journals/all', {
          withCredentials: true,
        });
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to fetch journal history:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">📜 Your Journal History</h2>

      <div className="space-y-6 max-w-3xl mx-auto">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <p className="text-sm text-gray-400">
              {new Date(entry.createdAt).toDateString()}
            </p>

            <p className="text-purple-700 italic mb-2">
              <strong>Reflection:</strong> {entry.prompt}
            </p>

            <p className="text-gray-800 whitespace-pre-wrap mb-4">{entry.content}</p>

            <div className="text-sm text-gray-600">
              <p>
                <strong>Mood:</strong> {entry.emoji || '📝'} {entry.mood}
              </p>
              <p>
                <strong>AI Feedback:</strong> {entry.feedback}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-6'>
        <Link to="/journal" className="mt-4 inline-block text-sm bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Write Another Journal</Link>
      </div>
    </div>
  );
};

export default History;