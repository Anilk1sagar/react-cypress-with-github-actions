import { useEffect, useState } from "react";
import { fetchUsers } from "./rest/users.rest";

function App() {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers().then((data: any[]) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", margin: "20px" }}>
      <div data-testid="count-text">{count}</div>

      <button data-testid="count-btn" type="button" onClick={() => setCount(count + 1)}>
        Count ++ okay
      </button>

      {users.length > 0 && (
        <ul data-testid="users-list" style={{ textAlign: "left" }}>
          {users.map((user) => (
            <li>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
