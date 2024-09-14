import React, {useState} from 'react'
import './styles.css'

const Search_Bar = () => {
    const [input, setInput] = useState("");
    const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';
    // https://jsonplaceholder.typicode.com/users 
    // use this link to test fetches, but it comes back as an array instead of 
    // plain object so it now crashes.

    const fetchData = (value) => {
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            if (json.error) {
                console.log("Error: ", json.error)
                // This will be the console error since none of the
                // contacts are being added to the database
            } 
            else if (json.name || json.email || json.phone) {
                // makes the objects an array
                const results = [json];
                const filteredResults = results.filter((user) => {
                    return (
                        user.name.toLowerCase().includes(value.toLowerCase()) ||
                        user.email.toLowerCase().includes(value.toLowerCase()) ||
                        user.phone.toLowerCase().includes(value.toLowerCase())
                    );
                });
                console.log(filteredResults);
            }
            else {
                console.log("No valid data found");
            }
        })
        .catch((error) => {
            console.error("Error Searching Data: ", error);
        });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

  return (
    <div className='input-wrapper'>
        <input 
        className="search-bar-box"
        placeholder='Search for a Contact'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        />
      
    </div>
  )
}

export default Search_Bar
