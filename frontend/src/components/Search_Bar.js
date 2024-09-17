import React, {useState} from 'react'
import './styles.css'

const Search_Bar = ({ setResults, setSearchValue }) => {
    const [input, setInput] = useState("");
    const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';

    const fetchData = (value) => {
        if (value === "") {
            setResults([]);
        } 
        else {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify( { search: value , userId : localStorage.getItem('userID') } )
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

    };

    const handleChange = (value) => {
        setInput(value);
        setSearchValue(value);
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
