import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    if (!movie.trim()) {
      setError("Please enter a movie title.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.post(
        "https://ds-netflix-movie-recommender-backend.onrender.com/recommend",
        { title: movie }
      );
      setResults(res.data.recommendations);
    } catch (err) {
      console.error("❌ Axios error:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("⚠️ Unable to connect to server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🎬 Netflix Movie Recommender</h1>

      <input
        type="text"
        placeholder="Enter a movie title"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button onClick={fetchRecommendations}>Recommend</button>

      {loading && <p>Loading recommendations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && !error && (
        <ul>
          {results.map((r, idx) => (
            <li key={idx}>👉 {r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
