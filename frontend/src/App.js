import React from "react";
import './App.css';
import Header from "./components/header";
import FilesView from "./components/filesView/FilesView";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import StudReg from "./components/studReg/StudReg";
import FileItem from "./components/filesView/fileItem";
import AdminLogin from "./components/login/AdminLogin";
import Recording from "./components/recording/Recording";
import FileSearch from "./components/fileSearch/FileSearch";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
          <Routes>
            <Route exact path="/studentLogin" element={<Login />} />
            <Route exact path="/studentRegister" element={<StudReg />} />
            <Route path="/search" element={<FileSearch />} />
            <Route path="/course" element={<FileItem />} />

            <Route exact path="/adminLogin" element={<AdminLogin />} />
            <Route exact path="/adminRegister" element={<Register />} />
            <Route path = "/recording" element={<Recording />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
