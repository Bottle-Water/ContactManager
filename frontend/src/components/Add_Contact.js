import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add_Contact = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();  

    const add = (e) => {
        e.preventDefault();
        if (name === "" || email === "") {
            alert("All fields are mandatory!");
            return;
        }
        props.Add_Contact_Handler({ name, email });
        setName("");
        setEmail("");

        navigate("/contact_list"); 
    };

    return (
        <div className="ui main">
            <div>
            <h3 className="ui center aligned header">
            Center
             </h3>
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
                        type="text" 
                        name="email"
                        placeholder="Email"  
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
};

export default Add_Contact;
