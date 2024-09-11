import React from "react";
import { Link } from "react-router-dom";
import Contact_Info from "./Contact_Info";
import Navbar2 from "./Navbar2";

const Contact_List = (props) => {
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
      <div className="ui sizer vertical segment"> 
      <div></div>
      <div className="ui center aligned large header">Contact List</div>
      <p></p>
        <div className="ui celled list">{render_ContactList}</div>
        <Link to="/add">
        <button className="ui button blue">Add</button>
        </Link>
      </div>
    </>
  );
};

export default Contact_List;
