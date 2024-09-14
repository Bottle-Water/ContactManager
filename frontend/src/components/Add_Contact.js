import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const Add_Contact = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setNumber] = useState("");
    const navigate = useNavigate();  

    const add = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || phone === "") {
            alert("All fields are mandatory!");
            return;
        }
        props.Add_Contact_Handler({ name, email, phone });
        setName("");
        setEmail("");
        setNumber("");

        navigate("/contact_list"); 
    };

    const addContact = async () => {
        const url = 'http://gerberknights3.xyz/LAMPAPI/addContact.php';
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ name, email, phone })
          });
      
          // Check if the response is OK
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Try to parse the response as JSON
          const data = await response.json();
          console.log("Response data:", data);
      
        } catch (error) {
          // Handle JSON parsing or network errors
          console.error('Error adding contact:', error);
        }
      };

    return (
        <>
            <Navbar2/>
                <div className="main-body">
                    <div>
                    </div>
                    <h1 className="ui center aligned header">Add Contact</h1>
                    <form className="ui form" onSubmit={add}>
                        <div className="field">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email"  
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                placeholder="Phone Number" 
                                 value={phone}
                                 onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="add-buttons">
                            <button className="ui button blue" onClick={addContact}> Add</button>

                            <Link to="/contact_list">Back to List</Link>
                        </div>
                    </form>
                </div>
        </>
    );
};

export default Add_Contact;
