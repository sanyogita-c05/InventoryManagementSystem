// 📁 src/Components/RecipePage.js

import React, { useState } from 'react';
import './RecipePage.css';
import Navbar from './Navbar';
import Footer from './Footer';

// Images
import f1 from '../Assets/f1.jpg';
import f2 from '../Assets/f2.jpg';
import f3 from '../Assets/f3.jpg';
import f4 from '../Assets/f4.jpg';
import f5 from '../Assets/f5.jpg';

function RecipePage() {
  const cuisines = [
    {
      title: 'South Indian',
      image: f1,
      recipe: {
        name: 'Idli Sambhar',
        ingredients: ['Rice', 'Urad Dal', 'Fenugreek Seeds', 'Vegetables', 'Spices'],
        steps: [
          'Soak rice and dal, grind to batter, ferment overnight.',
          'Steam the batter into idlis.',
          'Prepare sambhar with vegetables and spices.',
          'Serve hot idlis with sambhar and coconut chutney.'
        ]
      }
    },
    {
      title: 'Maharashtrian',
      image: f2,
      recipe: {
        name: 'Misal Pav',
        ingredients: ['Sprouts', 'Onion', 'Tomato', 'Spices', 'Pav'],
        steps: [
          'Cook sprouts with spicy gravy.',
          'Garnish with onion, farsan.',
          'Serve hot with buttered pav.'
        ]
      }
    },
    {
      title: 'Chinese',
      image: f3,
      recipe: {
        name: 'Veg Manchurian',
        ingredients: ['Cabbage', 'Carrot', 'Flour', 'Soy Sauce', 'Spices'],
        steps: [
          'Make veggie balls and deep fry.',
          'Prepare Manchurian gravy.',
          'Mix balls with gravy and serve hot.'
        ]
      }
    },
    {
      title: 'Punjabi',
      image: f4,
      recipe: {
        name: 'Butter Chicken',
        ingredients: ['Chicken', 'Butter', 'Tomato', 'Cream', 'Spices'],
        steps: [
          'Marinate and grill chicken.',
          'Prepare buttery tomato gravy.',
          'Mix and simmer chicken, serve with naan.'
        ]
      }
    },
    {
      title: 'Rajasthani',
      image: f5,
      recipe: {
        name: 'Dal Baati Churma',
        ingredients: ['Wheat', 'Dal', 'Ghee', 'Jaggery', 'Spices'],
        steps: [
          'Bake baatis till golden.',
          'Prepare dal with tempering.',
          'Serve baatis with dal and sweet churma.'
        ]
      }
    }
  ];

  const [selectedCuisine, setSelectedCuisine] = useState(cuisines[0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSend = () => {
    if (!userMessage.trim()) return;

    const userText = userMessage.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: userText }]);
    setUserMessage('');

    setTimeout(() => {
      const suggestion = getRecipeSuggestion(userText);
      setChatMessages(prev => [...prev, { type: 'bot', text: suggestion }]);
    }, 800);
  };

  const getRecipeSuggestion = (input) => {
    const ingredients = input.toLowerCase();

    if (ingredients.includes('rice') && ingredients.includes('tomato')) {
      return 'You can make Tomato Rice! 🍚🍅';
    } else if (ingredients.includes('potato')) {
      return 'How about Aloo Paratha? 🥔🫓';
    } else if (ingredients.includes('paneer')) {
      return 'Try making Paneer Butter Masala! 🧀🍛';
    } else {
      return 'Maybe try a Mixed Veg Curry! 🍛🥦🥕';
    }
  };

  return (
    <>
      <Navbar />
      <div className="recipe-main-page">

        {/* Dishes Section */}
        <div className="cuisines-container">
          {cuisines.map((cuisine, index) => (
            <div
              key={index}
              className={`cuisine-card ${selectedCuisine.title === cuisine.title ? 'active' : ''}`}
              onClick={() => handleCuisineClick(cuisine)}
            >
              <img src={cuisine.image} alt={cuisine.title} />
              <h3>{cuisine.title}</h3>
            </div>
          ))}
        </div>

        {/* Big Recipe Box */}
        <div className="big-recipe-box">
          <h2>{selectedCuisine.recipe.name}</h2>
          <h4>Ingredients:</h4>
          <ul>
            {selectedCuisine.recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h4>Steps:</h4>
          <ol>
            {selectedCuisine.recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Floating Chat Button */}
        {!chatOpen && (
          <button className="chatbot-button" onClick={toggleChat}>
            💬
          </button>
        )}

        {/* Chatbot Popup */}
        {chatOpen && (
          <div className="chatbot-popup">
            <div className="chatbot-header">
              <h4>Recipe Bot</h4>
              <button className="minimize-button" onClick={toggleChat}>➖</button>
            </div>

            <div className="chatbot-messages">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Enter ingredients..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
}

export default RecipePage;
