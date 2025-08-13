import React from 'react';
import { Trophy, TreePine } from 'lucide-react';

export function UserStats({ sustainabilityIndex, totalScans, rank }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Sustainability Index</h3>
          <p className="text-3xl font-bold text-green-600">
            {sustainabilityIndex.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600">Average score</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Leaderboard Rank</h3>
          <p className="text-3xl font-bold text-green-600">#{rank}</p>
          <p className="text-sm text-gray-600">Global ranking</p>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="h-8 w-8 mx-auto mb-2 text-3xl">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900">Total Scans</h3>
          <p className="text-3xl font-bold text-green-600">{totalScans}</p>
          <p className="text-sm text-gray-600">Products scanned</p>
        </div>
      </div>
    </div>
  );
}

export default UserStats;