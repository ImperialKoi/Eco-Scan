import React from 'react';
import { Medal } from 'lucide-react';

export function Leaderboard({ entries }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Global Leaderboard</h2>
        <Medal className="h-6 w-6 text-green-600" />
      </div>
      
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.username}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-green-600">
                #{index + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{entry.username}</p>
                <p className="text-sm text-gray-600">{entry.total_scans} scans</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {entry.sustainability_index.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">sustainability index</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;