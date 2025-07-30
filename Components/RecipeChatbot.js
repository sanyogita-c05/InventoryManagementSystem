import React, { useState } from 'react';
import './RecipeChatbot.css';

const recipes = [
  { name: 'Tomato Onion Curry', ingredients: ['tomato', 'onion', 'garlic'], steps: '1. Heat oil, sauté onion and garlic. 2. Add tomatoes, cook until soft. 3. Serve hot.' },
  { name: 'Grilled Cheese Sandwich', ingredients: ['bread', 'cheese', 'butter'], steps: '1. Butter bread slices. 2. Add cheese between slices. 3. Grill until golden.' },
  { name: 'Veg Fried Rice', ingredients: ['rice', 'vegetables', 'soy sauce'], steps: '1. Stir-fry vegetables. 2. Add cooked rice and soy sauce. 3. Serve hot.' },
  { name: 'French Fries', ingredients: ['potato', 'oil', 'salt'], steps: '1. Cut potatoes. 2. Fry until golden. 3. Add salt and serve.' },
  { name: 'Masala Chai', ingredients: ['milk', 'sugar', 'tea leaves'], steps: '1. Boil milk with tea leaves. 2. Add sugar. 3. Serve hot.' },

  // New Recipes
  { name: 'Pancakes', ingredients: ['flour', 'sugar', 'baking powder'], steps: '1. Mix ingredients. 2. Pour on a pan. 3. Cook until golden.' },
  { name: 'Scrambled Eggs', ingredients: ['egg', 'salt', 'pepper'], steps: '1. Whisk eggs. 2. Cook in a pan. 3. Serve hot.' },
  { name: 'Banana Smoothie', ingredients: ['banana', 'milk', 'honey'], steps: '1. Blend all ingredients. 2. Serve chilled.' }
];

function RecipeChatbot() {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = userInput.toLowerCase().split(',').map(item => item.trim());

    let foundRecipe = recipes.find(recipe =>
      recipe.ingredients.every(ingredient => items.includes(ingredient)) &&
      items.every(item => recipe.ingredients.includes(item))
    );

    if (foundRecipe) {
      setBotResponse(`You can make: 🍽️ ${foundRecipe.name}\n\nRecipe: ${foundRecipe.steps}`);
    } else {
      setBotResponse("Sorry, I couldn't find a perfect recipe. Try different items! 🧑‍🍳");
    }
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <h2>Recipe Chatbot 🤖</h2>
      <div className="chat-box">
        <p className="bot-message">{botResponse || 'Tell me your ingredients! 🍅🧄🍞'}</p>
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
}

export default RecipeChatbot;