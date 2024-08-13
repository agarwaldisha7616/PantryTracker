import React from 'react';
import PantryInventory from './components/PantryInventory';
import ShoppingList from './components/ShoppingList';
import RecipeRecommendations from './components/RecipeRecommendations';
import Footer from './components/Footer'; // Import the Footer component
import './App.css'; // Import the CSS file
import logo from './components/Background.png'; // Import the logo image

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Pantry Palette</h1>
      </header>
      <div className="container">
        <div className="section">
          <PantryInventory />
        </div>
        <div className="section">
          <ShoppingList />
        </div>
        <div className="section">
          <RecipeRecommendations />
        </div>
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default App;
