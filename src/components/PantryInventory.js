import React, { useState, useEffect } from 'react';
import './PantryInventory.css';

const PantryInventory = () => {
  const [rows, setRows] = useState(() => {
    // Load data from localStorage or use default values
    const savedRows = JSON.parse(localStorage.getItem('pantryRows'));
    return savedRows || [
      { checked: false, item: 'Chocolate chips', expirationDate: 'August 10, 2023', tags: 'Snacks and Treats' },
      { checked: false, item: 'Baking powder', expirationDate: 'September 21, 2023', tags: 'Baking Supplies' },
      { checked: false, item: 'Granola bars', expirationDate: 'October 19, 2023', tags: 'Snacks and Treats' }
    ];
  });

  useEffect(() => {
    // Save data to localStorage whenever rows change
    localStorage.setItem('pantryRows', JSON.stringify(rows));
  }, [rows]);

  const handleCheckboxChange = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].checked = !updatedRows[index].checked;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { checked: false, item: '', expirationDate: '', tags: '' }
    ]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <section className="pantry-inventory">
      <h2>Pantry Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>☑️</th>
            <th>Aa Item</th>
            <th>🗒️ Expiration Date</th>
            <th>🏷️Tags</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={row.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.item}
                  onChange={(e) => handleRowChange(index, 'item', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.expirationDate}
                  onChange={(e) => handleRowChange(index, 'expirationDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.tags}
                  onChange={(e) => handleRowChange(index, 'tags', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-row">
        <button onClick={addRow}>+ Add Row</button>
      </div>
    </section>
  );
};

export default PantryInventory;
