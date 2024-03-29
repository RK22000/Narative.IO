import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import Camp from "./Camp";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <React.StrictMode>
      <ConvexProvider client={convex}>
        {/* <App /> */}
        <Camp />
      </ConvexProvider>
    </React.StrictMode>,
  </div>
);
