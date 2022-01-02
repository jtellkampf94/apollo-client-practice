import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import "./App.css";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      nameWithEmoji @client
      languages {
        name
        rtl
      }
    }
  }
`;

function App() {
  const [code, setCode] = useState("");
  const { data, loading, error } = useQuery(COUNTRY, {
    variables: { code },
    skip: code.length !== 2,
  });

  return (
    <div className="App">
      {error && <h1>{`You broke it ${error.message}`}</h1>}
      {!data || loading ? (
        <h1>loading...</h1>
      ) : (
        <h1>
          {data.country?.name} {data.country?.emoji}
          {data.country?.nameWithEmoji}
        </h1>
      )}
      <input
        type="text"
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
    </div>
  );
}

export default App;
