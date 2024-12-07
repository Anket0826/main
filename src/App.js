import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoTaskFound from "./component/NoPageFound";
import Login from "./pages/SingUp";
import SingIn from "./pages/SingIN";

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<SingIn />} />
          <Route path="/singup" element={<Login />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/add-task' element={<HomePage />} />
          <Route path="/pending-task" element={<HomePage />} />
          <Route path="/completed-task" element={<HomePage />} />
          <Route path="*" element={<NoTaskFound />} />
        </Routes>
      </Router>
  );
}

export default App;
