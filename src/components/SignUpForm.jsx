import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      setToken(result.token);
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2 className="h2">Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              //   required
              minLength={8}
            />
          </label>
          {username.length < 8 && username.length > 0 && (
            <p className="char">Name must be at least 8 characters long.</p>
          )}
        </div>
        <div className="field">
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   required
            />
          </label>
        </div>
        <button className="button">Submit</button>
      </form>
      <div className="message">
        {successMessage && <p>{username}, thanks for signing up!</p>}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
