import { useEffect } from "react";
import "./App.css";
import "./Assests/fontAwesomeProIcons/fontAwesomeIcons.css";

function App() {
  let opts = {
    code: process.env.REACT_APP_CODE,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    grantType: "authorization_code",
  };
  const urlToFetchAccessCode = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${opts.clientId}&redirect_uri=${opts.redirectUri}`;

  function handleLoginReq() {
    window.location = urlToFetchAccessCode;
  }

  return (
    <div>
      <button
        className=" bg-yellow-500 p-[.5rem] rounded-md"
        onClick={handleLoginReq}
      >
        Login
      </button>
    </div>
  );
}

export default App;
