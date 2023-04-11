import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Detail from "./components/Detail";
import LandingPage from "./components/LandingPage";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Nav path="/" element={<Nav />} />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
