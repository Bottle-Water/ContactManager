import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Contact_Info from "./Contact_Info";
import Navbar2 from "./Navbar2";
import Search_Bar from "./Search_Bar";
import './styles.css';

const userID = localStorage.getItem('userID');

const Contact_List = (props) => {
  const [results, setResults] = useState([]);

  const delete_Contact_Handler = async (id) => {
    props.getContactId(id);

    const url = 'http://gerberknights3.xyz/LAMPAPI/DeleteContact.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ ID: id }),
      });

      const data = await response.json();
      console.log("response: ", data);

    } catch (error) {
      console.error('Error Deleting contact:', error);
    }
  };

  const search_Contact_Handler = async (search) => {
    const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ Search: search, userID: userID }),
      });

      const data = await response.json();
      console.log("response: ", data);
      setResults(data);

    } catch (error) {
      console.error('Error Searching contact:', error);
    }
  };

  const render_ContactList = props.contacts.map((contact) => {
    if (!contact || !contact.ID) {  // Validate with ID instead of userID
      console.error('Invalid contact object:', contact);
      return null;
    }
    return (
      <Contact_Info
        contact={contact}
        clickHandler={delete_Contact_Handler}
        key={contact.ID}  // Use ID as the key
      />
    );
  });

  return (
    <>
      <Navbar2/>
      <div className="search-bar-container">
        <Search_Bar setResults={setResults} searchHandler={search_Contact_Handler} />

        {results.map((result, index) => (
          <Link to="/" key={index} className="result-link">
            <div className="result-item">
              <p>Name: {result.Name}</p>
              <p>Email: {result.Email}</p>
              <p>Phone: {result.Phone}</p>
              <p>Date Created: {result.DateCreated}</p>
            </div>
          </Link>
        ))}
        <div className="contact-header">Contact List</div>
        <p></p>
        <div className="ui celled list">{render_ContactList}</div>
        <Link to="/add">
          <button className="ui blue button">Add Contact</button>
        </Link>
      </div>
    </>
  );
};

export default Contact_List;
