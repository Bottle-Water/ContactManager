import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add_Contact from "./Add_Contact";
import Contact_List from "./Contact_List";
import Home from "./Home";
import Contact_edit from "./Contact_edit";
import Register from "./Register";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/contact_list" 
            element={<Contact_List />} 
          />
          <Route 
            path="/add" 
            element={<Add_Contact />} 
          />
          {/*Current issue right now trying to fix the edit button for each of our contacts that we want to edit*/}
          <Route 
            path="/edit/:id" 
            element={<Contact_edit />} 
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;
