import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import { Toaster } from "./components/ui/sonner";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
    <Toaster />
      <App className="" />
    </ChatProvider>
  </BrowserRouter>
);
