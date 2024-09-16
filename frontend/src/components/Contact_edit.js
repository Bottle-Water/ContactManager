import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Contact_edit = ({ contacts, update_Contact_Handler }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({ Name: "", email: "", phone: "" });

    useEffect(() => {
        const contact_To_Edit = contacts.find(contact => contact.id === id);
        if (contact_To_Edit) {
            setContact(contact_To_Edit);
        }
    }, [id, contacts]);

    const update = (e) => {
        e.preventDefault();

        update_Contact_Handler(contact);
        navigate("/contact_list"); 
    };

    const Contact_edit = async () => {
        const url = 'http://gerberknights3.xyz/LAMPAPI/UpdateContact.php';
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ contact })
    
          })
          .then(response => response.json())
          .then(data => console.log( "response" + data));
      
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error adding contact:', error);
        }
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
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"  
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                </div>
                <div className="field">
                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Phone" 
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            />
                        </div>
           <button className="ui button blue">Update</button>
               <button type="submit" className="ui button blue">Update</button>
            </form>
        </div>
    );
};

export default Contact_edit;
