import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router";
import Intro from "./pages/intro";
import SignInPage from "./pages/signIn";
import LoginPage from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Intro/>}/>
    <Route path="/register" element={<SignInPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer position="top-center"/>
  </>
}

export default App;
