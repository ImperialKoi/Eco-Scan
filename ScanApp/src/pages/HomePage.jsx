import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scan, Database, TreePine, Globe, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import UserStats from '../components/UserStats';
import Leaderboard from '../components/Leaderboard';

export function HomePage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate('/login');
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/login');
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (session) {
      // Fetch user stats
      const fetchUserStats = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!error && data) {
          setUserStats(data);
        }

        // Send user data to be stored in python server
        const response = await fetch("http://localhost:3500/receive_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: data }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

      };

      // Fetch leaderboard
      const fetchLeaderboard = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, sustainability_index, total_scans')
          .order('sustainability_index', { ascending: false })
          .limit(10);

        if (!error && data) {
          setLeaderboard(data);
        }
      };

      fetchUserStats();
      fetchLeaderboard();
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {userStats && (
          <UserStats
            sustainabilityIndex={userStats.sustainability_index}
            totalScans={userStats.total_scans}
            rank={leaderboard.findIndex(entry => entry.username === userStats.username) + 1}
          />
        )}

        {/* Features Section */}
        <section className="py-16 bg-white rounded-xl shadow-lg mb-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How EcoScan Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scan className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Scan & Identify</h3>
                <p className="text-gray-600">
                  Simply scan a company's logo or QR code using your device's camera
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Analysis</h3>
                <p className="text-gray-600">
                  Our database provides immediate sustainability metrics and scores
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Impact</h3>
                <p className="text-gray-600">
                  Make informed decisions that support sustainable businesses
                </p>
              </div>
            </div>
          </div>
        </section>

        <Leaderboard entries={leaderboard} />

        {/* CTA Section */}
        <section className="py-16">
          <div className="bg-green-600 rounded-2xl p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Globe className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Make Sustainable Choices?
              </h2>
              <p className="text-green-100 mb-8">
                Start scanning products and contribute to a more sustainable future.
              </p>
              <Link
                to="/camera"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-semibold"
              >
                Start Scanning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;