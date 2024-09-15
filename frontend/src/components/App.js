import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Add_Contact from "./Add_Contact";
import Contact_List from "./Contact_List";
import Home from "./Home";
import Contact_edit from "./Contact_edit";
import Register from "./Register";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const Add_Contact_Handler = (contact) => {
    const userID = localStorage.getItem('userID');
    console.log(contact);
    setContacts([...contacts, { id: uuid(), userID: userID, ...contact }]);
    // setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const remove_Contact_Handler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const update_Contact_Handler = (updated_Contact) => {
    setContacts(
      contacts.map(contact => 
        contact.id === updated_Contact.id ? updated_Contact : contact
      )
    );
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/contact_list" 
            element={<Contact_List contacts={contacts} getContactId={remove_Contact_Handler} />} 
          />
          <Route 
            path="/add" 
            element={<Add_Contact Add_Contact_Handler={Add_Contact_Handler} />} 
          />
          {/*Current issue right now trying to fix the edit button for each of our contacts that we want to edit*/}
          <Route 
            path="/edit/:id" 
            element={<Contact_edit contacts={contacts} update_Contact_Handler={update_Contact_Handler} />} 
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;
