import React, { useState }from 'react';
import { Link } from "react-router-dom";
import Contact_Info from "./Contact_Info";
import Navbar2 from "./Navbar2";
import Search_Bar from "./Search_Bar";
import './styles.css'

const Contact_List = (props) => {
  const [results, setResults] = useState([]);

  const delete_Contact_Handler = async (id) => {
    props.getContactId(id);
    // THE ID IS CORRECT 

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

  const render_ContactList = props.contacts.map((contact) => {
    return (
      <Contact_Info
        contact={contact}
        clickHandler={delete_Contact_Handler}
        key={contact.userID}
      />
    );
  });
  

  return (
    <>
    <Navbar2/>
      <div className="search-bar-container">
        <Search_Bar setResults={ setResults }/>
        {/* Uncomment these lines out to see what the results will
        look like (they will stack with mapping) */}
        {/* <div className='results-list'>
          <Link to="/Contact_List" className='result-link'>
            <div className="result-item">
              <p>A</p>
              <p>A</p>
            </div>
            <div className="result-item">
              <p>A</p>
              <p>A</p>
            </div>
            <div className="result-item">
              <p>A</p>
              <p>A</p>
            </div>
          </Link>
          </div> */}

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
