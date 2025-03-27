import { useState } from "react";
import { Button } from "@/components/ui/button";
import "./App.css";

import Homepage from "./Pages/Homepage";
import LoginPage from "./_components/LoginPage";
import { Routes, Route, Link } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import SignUppage from "./_components/SignUppage";
import Auth from "./Pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Homepage />  } />
      <Route path="/auth" element={<Auth />} />
      <Route path="/chats" element={<Chatpage />} />
      

    </Routes>
  );
}

export default App;
