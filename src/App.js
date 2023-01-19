import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createContext } from "react";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { Forgot } from "./components/Forgot";
import { Success } from "./components/success.js";
import { Routes, Route, Outlet } from "react-router-dom";
import { NotFound } from "./components/notfound";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { Layout } from "./user";
import { Dashboard } from "./Dashboard";
import { CreateUrl } from "./components/createrUrl";
import { ListUrl } from "./components/listUrl";
import { Urldirect } from "./components/Urldirect";
export const apiContext = createContext();
function App() {
  // const serverApi = "http://localhost:4000";
  // const clientURL = "http://localhost:3000/";
  const serverApi = "https://url-short-backend-two.vercel.app";
  const clientURL = "https://curious-llama-201728.netlify.app/";
  const contextObj = {
    serverApi: serverApi,
    clientURL: clientURL,
  };

  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <div className="project-container">
        <apiContext.Provider value={contextObj}>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/forgot-password" element={<Forgot />} />
              <Route path="/success" element={<Success />} />
            </Route>
            <Route path="/short/:id" element={<Urldirect />} />
            <Route path="/user" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="new-url" element={<CreateUrl />} />
              <Route path="list-url" element={<ListUrl />} />
            </Route>
            <Route path="*" element={<NotFound />} />

            <Route
              path="/change-password/:id"
              element={<ChangePasswordForm />}
            />
          </Routes>
        </apiContext.Provider>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome to Short Url Application</h1>
      <Outlet />
    </>
  );
}

export default App;
