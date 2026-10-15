import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import AuthContextProvider from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AuthRoutes />
  </AuthContextProvider>,
);
