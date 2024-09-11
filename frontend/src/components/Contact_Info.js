import React from "react";
import { Link } from "react-router-dom";

const Contact_Info = ({ contact, clickHandler }) => {
    const { id, name, email } = contact;

    return (
        <div className="item">
            <div className="content">
                <div className="header">{name}</div>
                <div>{email}</div>
            </div>
            {/* Edit icon */}
            <i 
                className="trash icon icon right floated container" 
                style={{ color: "red", marginTop: "10px", cursor: "pointer" }}
                onClick={() => clickHandler(id)}
            ></i>

            {/* Edit icon */}
            <Link to={`/edit/${id}`}>
                <i 
                    className="edit alternate icon right floated" 
                    style={{ color: "blue", marginTop: "10px", marginRight:"10px", cursor: "pointer" }}
                ></i>
            </Link>
        </div>
    );
};

export default Contact_Info;
