import { useState } from "react";
import { Button } from "@/components/ui/button";
import "./App.css";

import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route, Link } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import SignUppage from "./Pages/SignUppage";

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Homepage />  } />
      <Route path="/chats" element={<Chatpage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUppage />} />

    </Routes>
  );
}

export default App;
