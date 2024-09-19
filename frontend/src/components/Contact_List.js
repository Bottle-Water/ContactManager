import React, { useState }from 'react';
import { Link } from "react-router-dom";
import Contact_Info from "./Contact_Info";
import Navbar2 from "./Navbar2";
import Search_Bar from "./Search_Bar";
import './styles.css'

const Contact_List = () => {
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  // this fetch works for the search bar
  const fetchData = (value) => {
    const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';

    if (value === "") {
        setResults([]);
    } 
    else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({ search: value, userId : localStorage.getItem('userID') })
        })
        .then((response) => response.json())
        .then((json) => {

            if (json.error) {
                console.log("Error: ", json.error)
                setResults([]);
            } 
            else if (json.results && json.results.length > 0) {
                setResults(json.results);
                console.log(json.results);
            }
            else {
                console.log("No valid data found");
                setResults([]);
            }
        })
        .catch((error) => {
            console.error("Error Searching Data: ", error);
        });
    }   
  };

  const delete_Contact_Handler = async (id) => {
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

      // refetch the data after a deletion
      if (data.results === "contact deleted") {
        fetchData(searchValue);
      }

    } catch (error) {
      console.error('Error Deleting contact:', error);
    }

  };
  
  const render_ContactList = () => {
    return (
      <Contact_Info />
    );
  };

  return (
    <>
    <Navbar2/>
      <div className="search-bar-container">
        <Search_Bar setResults={ setResults } setSearchValue={ setSearchValue }/>
        <div className='results-list'>
          {results.map((result, index) => (
              <div key={index} className="result-item">
                <p>Name: {result.Name}</p>
                <p>Email: {result.Email}</p>
                <p>Phone: {result.Phone}</p>
                <p>Date Created: {result.DateCreated}</p>
                <div className="icon-group">
                  <Link 
                  to={`/edit/${result.ID}`}
                  state = {{ name: result.Name, email: result.Email, phone: result.Phone }}
                  >
                  <i 
                      className="edit icon" 
                      style={{ color: "blue", cursor: "pointer"}}
                  ></i>
                  </Link>
                  <i 
                  className="trash icon" 
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => delete_Contact_Handler(result.ID)}
                  ></i>
                  </div>
              </div>
          ))}
        </div>

      <div className="contact-header">Contact List</div>
      <p></p>
        <div className="ui celled list">{render_ContactList()}</div>
        <Link to="/add">
        <button className="ui blue button">Add Contact</button>
        </Link>
      </div>
    </>
  );
};

export default Contact_List;
