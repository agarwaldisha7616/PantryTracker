import React, { useState, useEffect } from 'react';
import './ShoppingList.css';

const ShoppingList = () => {
  const [items, setItems] = useState(() => {
    // Load data from localStorage or use default values
    const savedItems = JSON.parse(localStorage.getItem('shoppingItems'));
    return savedItems || [
      { name: 'Garlic powder', checked: false },
      { name: 'Cumin', checked: false },
      { name: 'Cinnamon', checked: false },
      { name: 'Baking soda', checked: false },
      { name: 'Cocoa powder', checked: false },
      { name: 'Vanilla extract', checked: false }
    ];
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Save data to localStorage whenever items change
    localStorage.setItem('shoppingItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { name: newItem, checked: false }]);
      setNewItem('');
    }
  };

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  return (
    <section className="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={item.checked ? 'checked' : ''}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            {item.name}
          </li>
        ))}
      </ul>
      <div className="add-item">
        <input
          type="text"
          placeholder="Add an item"
          value={newItem}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addItem}>Add</button>
      </div>
    </section>
  );
};

export default ShoppingList;
