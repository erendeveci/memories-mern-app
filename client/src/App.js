//React
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <div className="max-w-full  m-auto mt-4   rounded-sm h-[100%] flex flex-col md:block  ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="auth" element={<Auth />} />
            <Route
              path="*"
              element={
                <div>
                  <p>404</p>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
};
export default App;
