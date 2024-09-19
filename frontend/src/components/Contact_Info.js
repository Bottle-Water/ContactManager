import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles.css';

const Contact_Info = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        searchData();
    }, []);

    const searchData = async () => {
        const url ='http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({ search: "", userId : localStorage.getItem('userID') })
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

    const delete_handler = async (id) => {
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
            searchData();
        }
        } catch (error) {
        console.error('Error Deleting contact:', error);
        }
    }

    return (
        <div className="item">
            {results.map((result, index) => (
            <div key={index} className="contact-list">
            <div className="info">
                <div>Name: {result.Name}</div>
                <div>Email: {result.Email}</div>
                <div>Phone: {result.Phone}</div>
            </div>
                <i 
                    className="trash icon right floated" 
                    style={{ color: "red", marginTop: "10px", cursor: "pointer" }}
                    onClick={() => delete_handler(result.ID)}
                ></i>
                <Link 
                    to={`/edit/${result.ID}`}
                    state = {{ name: result.Name, email: result.Email, phone: result.Phone }}
                >
                    <i 
                        className="edit alternate icon right floated" 
                        style={{ color: "blue", marginTop: "10px", marginRight: "10px", cursor: "pointer" }}
                    ></i>
                </Link>
        </div>
        ))}
        </div>
    );
};

export default Contact_Info;
