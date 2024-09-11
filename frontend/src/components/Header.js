import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="ui fixed menu">
            <div className="ui container center">
            <Link to="/">
                <h2>UCF Contact Manager</h2>
            </Link>
            </div>
            <div className="ui right float">
            <Link to="/">
            <button className=" ui button active blue" >Sign out</button>
            </Link>
            </div>
        </div>
    );
};

export default Header