import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Contact_edit = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    // gets id from website link
    const { id } = useParams();
    const navigate = useNavigate();

    // This function will show the old contact when you visit the page
    useEffect(() => {
        fetchContact(id);
    }, [id]);

    // fetches original contact and sets name, email, and phone to them
    const fetchContact = async (id) => {
        // need to change url or use it differently
        const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({ ID: id }) // doesnt take in ID
            })

            const contact = await response.json();
            setName(contact.Name || "");
            console.log(contact.Name, contact.Phone, contact.Email);
            setEmail(contact.Email || "");
            setPhone(contact.Phone || "");

        } catch (error) {
                console.error("Error Finding Contact: ", error);
            };
      };

    // this will update the contact
    const updateContact = async (id) => {
        const url = 'http://gerberknights3.xyz/LAMPAPI/UpdateContact.php';
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ ID : id, Name: name, Email: email, Phone: phone})
    
          })
          const data = await response.json();
          console.log("response: ", data);
          navigate("/contact_list"); 
      
        } catch (error) {
          console.error('Error updating contact:', error);
        }
    };

    const update = (e) => {
        e.preventDefault();
        updateContact(id);
    };

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
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
                                name="phone" 
                                placeholder="Phone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                <button type="submit" className="ui button blue">Update</button>
            </form>
        </div>
    );
};

export default Contact_edit;
