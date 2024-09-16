import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Add_Contact = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const add = async (e) => {
        e.preventDefault();

        const userID = localStorage.getItem('userID');

        const url = 'http://gerberknights3.xyz/LAMPAPI/addContact.php';
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ name, email, phone, userID })
            });
            const data = await response.json();
            const id = data.ID;
            props.Add_Contact_Handler({ name, email, phone, userID , id});
            console.log("Response data:", data);
        } catch (error) {
            console.error('Error adding contact:', error);
        }

        setName("");
        setEmail("");
        setPhone("");

        navigate("/contact_list"); 
    };

    return (
        <>
            <div className="main-body">
                <div></div>
                <h1 className="ui center aligned header">Add Contact</h1>
                <form className="ui form" onSubmit={add}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email"  
                            required
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
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="add-buttons">
                        <button className="ui button blue">Add</button>
                        <Link to="/contact_list">Back to List</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add_Contact;
