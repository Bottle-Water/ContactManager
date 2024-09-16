import React, { useState }from 'react';
import { Link } from "react-router-dom";
import Contact_Info from "./Contact_Info";
import Navbar2 from "./Navbar2";
import Search_Bar from "./Search_Bar";
import './styles.css'

const Contact_List = (props) => {
  const [results, setResults] = useState([]);

  console.log(props);

  const delete_Contact_Handler = (id) => {
    props.getContactId(id);
  };

  const render_ContactList = props.contacts.map((contact) => {
    return (
      <Contact_Info
        contact={contact}
        clickHandler={delete_Contact_Handler}
        key={contact.id}
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
