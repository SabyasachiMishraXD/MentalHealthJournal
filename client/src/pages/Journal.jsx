import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Journal = () => {
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loadingPrompt, setLoadingPrompt] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();

  // Fetch prompt from backend on mount
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/journals/all', {
          withCredentials: true,
        });

        if (res.data.length > 0) {
          setPrompt(res.data[0].prompt); // Last used prompt
        } else {
          const defaultRes = await axios.get('http://localhost:8000/api/journals/default-prompt');
          setPrompt(defaultRes.data.prompt);
        }
      } catch (err) {
        console.error('Prompt fetch error:', err);
        setPrompt("How are you feeling today?");
      } finally {
        setLoadingPrompt(false);
      }
    };

    fetchPrompt();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAI(true);
    setAiResponse(null);

    try {
      const res = await axios.post(
        'http://localhost:8000/api/journals/create',
        { content: entry },
        { withCredentials: true }
      );

      setAiResponse({
        mood: res.data.entry.mood,
        emoji: res.data.entry.emoji,
        feedback: res.data.entry.feedback,
      });

      setPrompt(res.data.entry.prompt); // Show new prompt for next time
      setEntry('');
      toast.success('Journal submitted successfully 💜');
    } catch (err) {
      console.error('Error submitting journal:', err);
      toast.error('Failed to submit journal. Please try again.');
    } finally {
      setLoadingAI(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 px-4 py-8 relative">

      {/* Logout button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded shadow cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="bg-white w-full max-w-2xl p-8 mx-auto rounded-lg shadow-md mt-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Today's reflection, just for you 💜
        </h2>

        {loadingPrompt ? (
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="loader mb-2"></div>
            <p className="text-purple-600 text-sm italic">Loading your reflection...</p>
          </div>
        ) : (
          <p className="text-gray-700 text-center mb-6 italic">"{prompt}"</p>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            rows="6"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your journal entry here..."
            className="w-full p-4 border rounded-lg resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            disabled={loadingAI}
            className={`mt-4 w-full py-2 rounded text-white font-semibold shadow transition 
              ${loadingAI ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:scale-95'}`}
          >
            {loadingAI ? 'Analyzing your journal...' : 'Submit Journal'}
          </button>
        </form>

        {aiResponse && (
          <div className="mt-6 bg-purple-50 p-4 rounded text-sm shadow-inner">
            <p><strong>Mood:</strong> {aiResponse.emoji} {aiResponse.mood}</p>
            <p><strong>AI Feedback:</strong> {aiResponse.feedback}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/history" className="text-sm text-blue-600 hover:underline">
            View Journal History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Journal;