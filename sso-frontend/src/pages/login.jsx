import React, { useState } from "react";
import axios from "axios";

const handleLogin = (credentials) => {
  alert(JSON.stringify(credentials));
};

const login = () => {
  const [credentials, setCredentials] = useState(() => ({
    username: "",
    password: "",
  }));
  return (
    <div>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(credentials);
        }}
      >
        <label htmlFor="username">
          Username
          <input
            className="ml-2 border-2 rounded"
            id="username"
            type="text"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            className="ml-2 border-2 rounded"
            id="password"
            type="password"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>

        <button
          type="submit"
          className="bg-black px-4 py-2 w-fit rounded text-white"
        >
          go
        </button>
      </form>
    </div>
  );
};

export default login;
