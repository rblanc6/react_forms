import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    console.log("Hello 👋");
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2 className="h2">Authenticate</h2>
      <div className="message">
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
      </div>
      <button className="button" onClick={handleClick}>
        Authenticate Token!
      </button>
    </div>
  );
}
