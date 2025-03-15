import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById('root')).render(
  <UserProvider> {/* ✅ لف التطبيق داخل `UserProvider` */}
    <BrowserRouter> {/* ✅ لف التطبيق داخل `BrowserRouter` */}
      <App />
    </BrowserRouter>
  </UserProvider>
);
