import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Contact_edit = ({ contacts, update_Contact_Handler }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        const contact_To_Edit = contacts.find(contact => contact.id === id);
        if (contact_To_Edit) {
            setContact(contact_To_Edit);
        }
    }, [id, contacts]);

    const update = (e) => {
        e.preventDefault();
        if (contact.name === "" || contact.email === "" || contact.phone === "") {
            alert("Must fill in all Fields!");
            return;
        }

        update_Contact_Handler(contact);
        navigate("/contact_list"); 
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
                        type="text" 
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
                                name="phoneNumber" 
                                placeholder="Phone Number" 
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            />
                        </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
};

export default Contact_edit;
