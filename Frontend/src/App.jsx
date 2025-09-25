import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { userDataContext } from "./context/userContext";

const App = () => {

  let {userData}=useContext(userDataContext);

  return (
    <>
    {userData && <Nav/>}
      <Routes>
        <Route path="/signup" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
