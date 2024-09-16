import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add_Contact from "./Add_Contact";
import Contact_List from "./Contact_List";
import Home from "./Home";
import Contact_edit from "./Contact_edit";
import Register from "./Register";

function App() {
  const [contacts, setContacts] = useState([]);

  const Add_Contact_Handler = async (contact) => {
    try {
      const response = await fetch('http://gerberknights3.xyz/LAMPAPI/addContact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      setContacts([...contacts, data.contact]);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const remove_Contact_Handler = async (id) => {
    try {
      await fetch('http://gerberknights3.xyz/LAMPAPI/DeleteContact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: id }),
      });
      const newContactList = contacts.filter((contact) => contact.id !== id);
      setContacts(newContactList);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const update_Contact_Handler = async (updated_Contact) => {
    try {
      const response = await fetch('http://gerberknights3.xyz/LAMPAPI/UpdateContact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_Contact),
      });
      const data = await response.json();
      setContacts(
        contacts.map(contact => 
          contact.id === data.contact.id ? data.contact : contact
        )
      );
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

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
        <Route 
          path="/edit/:id" 
          element={<Contact_edit update_Contact_Handler={update_Contact_Handler} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
      </Routes>
    </Router>
  );
}

export default App;