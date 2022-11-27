import React, { useCallback, useState } from "react";
import axios from "axios";

import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FB_CLIENT_ID = import.meta.env.VITE_FB_CLIENT_ID;

console.log({ FB_CLIENT_ID });

const handleLogin = async (credentials) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/auth/token/`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "password",
      ...credentials,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleSSOLogin = async (access_token, backend) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/auth/convert-token`, {
      grant_type: "convert_token",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      backend,
      token: access_token,
    });

    return data;
  } catch (error) {}
};

const login = () => {
  const [credentials, setCredentials] = useState(() => ({
    username: "",
    password: "",
  }));

  const [isSSO, setIsSSO] = useState(false);

  const [loginRes, setLoginRes] = useState(null);
  const handleSubmit = useCallback(
    (e, credentials) => {
      e.preventDefault();
      handleLogin(credentials).then((data) => {
        setLoginRes(data);
      });
    },
    [setLoginRes]
  );

  return (
    <div>
      {loginRes ? (
        <pre className="max-w-3xl break-words text-xs">
          {JSON.stringify(loginRes, null, 2)}
        </pre>
      ) : null}

      <label htmlFor="isSSO" className="flex items-center">
        SSO?:
        <input
          className="ml-2"
          type="checkbox"
          checked={isSSO}
          onChange={() => setIsSSO((prev) => !prev)}
        />
      </label>
      {isSSO ? (
        <div>
          <LoginSocialGoogle
            client_id={GOOGLE_CLIENT_ID}
            access_type="online"
            scope="https://www.googleapis.com/auth/userinfo.email"
            onResolve={(res) => {
              console.log({ google_res: res });
              // const { access_token } = res.data;
              // handleSSOLogin(access_token, "google-oauth2")
              //   .then((data) => setLoginRes(data))
              //   .catch((e) => console.error(e));
            }}
            onReject={(reject) => console.error(reject)}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
          <LoginSocialFacebook
            appId={FB_CLIENT_ID}
            onResolve={(res) => {
              const { accessToken } = res.data;
              handleSSOLogin(accessToken, "facebook")
                .then((data) => setLoginRes(data))
                .catch((e) => console.error(e));
            }}
            onReject={(reject) => console.error(reject)}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>
      ) : (
        <form
          className="flex flex-col gap-3 mt-2 "
          onSubmit={(e) => handleSubmit(e, credentials)}
        >
          <label htmlFor="username">
            Username
            <input
              className="ml-2 border-2 rounded"
              id="username"
              type="text"
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
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
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
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
      )}
    </div>
  );
};

export default login;
