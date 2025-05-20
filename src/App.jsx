import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router";
import Intro from "./pages/intro";
import ProviderRes from "./pages/provider-register";
import Register from "./pages/user-register";
import Providerlogin from "./pages/provider-login";
import Login from "./pages/user-login";

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Intro/>}/>
    <Route path="/provider-register" element={<ProviderRes/>}/>
    <Route path="/user-register" element={<Register/>}/>
    <Route path="/provider-login" element={<Providerlogin/>}/>
    <Route path="/user-login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  </>
}

export default App;
