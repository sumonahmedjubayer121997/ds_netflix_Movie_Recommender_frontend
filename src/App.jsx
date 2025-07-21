import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [results, setResults] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post("http://localhost:5000/recommend", {
        title: movie,
      });
      setResults(res.data.recommendations);
    } catch (err) {
      console.error(err);
      setResults(["Error fetching recommendations"]);
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

      <ul>
        {results.map((r, idx) => (
          <li key={idx}>👉 {r}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
