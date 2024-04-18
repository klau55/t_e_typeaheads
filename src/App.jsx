import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cachedSuggestions, setCachedSuggestions] = useState({});


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    };
    if (cachedSuggestions[inputValue]) {
      setSuggestions(cachedSuggestions[inputValue]);
    } else {
      fetchSuggestions(inputValue);
    }
  }, [inputValue]);

  const fetchSuggestions = (inputValue) => {
    fetch(`https://api.github.com/search/users?q=${inputValue}+in:login&per_page=10`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_TOKEN}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const users = data.items.map(item => ({
        login: item.login,
        avatar_url: item.avatar_url
      }));
      setSuggestions(users);
      setCachedSuggestions(prevState => ({
        ...prevState,
        [inputValue]: users
      }));
    })
    .catch(error => {
      console.error('Error fetching GitHub users:', error);
      setSuggestions([]);
    });
  };

  const handleSuggestionClick = (suggestion) => {
    clearInput();
    window.open(`https://github.com/${suggestion.login}`, '_blank');
  };

  const clearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div id="the-basics" className="typeahead-container">
      <input 
        className="typeahead" 
        type="text" 
        placeholder="Github username" 
        value={inputValue} 
        onChange={handleInputChange} 
      />
      <button className="clear-button" onClick={() => clearInput()}>clear</button>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((user, index) => (
            <li 
              key={index} 
              className="suggestion" 
              onClick={() => handleSuggestionClick(user)}
            >
              <img 
                src={user.avatar_url} 
                alt="Profile" 
                className="avatar" 
              />
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
