import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="App" style={{ textAlign: "center", margin: "20px" }}>
      <div data-testid="count-text">{count}</div>

      <button data-testid="count-btn" type="button" onClick={() => setCount(count + 1)}>
        Count ++
      </button>
    </div>
  );
}

export default App;
