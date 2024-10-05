import React, { useState } from 'react';
import './App.css';

function App() {
  const [wtLiq, setWtLiq] = useState(0);
  const [wtAir, setWtAir] = useState(0);
  const [res1, setRes1] = useState(null);
  const [res2, setRes2] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true); // Show loader
    setRes1(null);    // Clear previous results
    setRes2(null);

    setTimeout(() => {
      const res1Value = (0.0440 / (1 - (wtLiq / wtAir))).toFixed(4);
      const res2Value = (0.0455 / (1 - (wtLiq / wtAir))).toFixed(4);
      setRes1(parseFloat(res1Value));
      setRes2(parseFloat(res2Value));
      setLoading(false); // Hide loader after calculation
    }, 1500); // 1.5 seconds delay for user experience
  };

  return (
    <div className="app-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Gold Purity Calculator</h1>

        <div className="input-group">
          <label htmlFor="wtAir">Weight in Air (gms):</label>
          <input
            type="number"
            id="wtAir"
            value={wtAir}
            onChange={(e) => setWtAir(parseFloat(e.target.value))}
            min="0"
            step="any"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="wtLiq">Weight in Liquid (gms):</label>
          <input
            type="number"
            id="wtLiq"
            value={wtLiq}
            onChange={(e) => setWtLiq(parseFloat(e.target.value))}
            min="0"
            step="any"
          />
        </div>


        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Purity'}
        </button>

        {loading && (
          <div className="loader"></div>
        )}

        {!loading && res1 && res2 && (
          <div className="result">
            <h2>
              Your Gold purity is somewhat between {(res1 * 100).toFixed(2)}% - {(res2 * 100).toFixed(2)}%
            </h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
