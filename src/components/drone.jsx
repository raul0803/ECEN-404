import React, { useState } from 'react';
import { firestore } from './firebase.jsx';
import { addDoc, collection } from "@firebase/firestore";

const Drone = () => {
  const ref = collection(firestore, "data");
  const initialRow = {
    lastBatteryChange: '',
    lastMotorChange: '',
    attachmentsCondition: '',
    propellorDamage: '',
  };

  // Load data from localStorage or use initialRow if no data exists
  const [rows, setRows] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('droneRows'));
    return storedData || [initialRow];
  });

  // Save data to Firestore and update localStorage
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addDoc(ref, { rows });
      // Update localStorage with the latest rows data
      localStorage.setItem('droneRows', JSON.stringify(rows));
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };

  // Update rows state and immediately update localStorage
  const handleInputChange = (index, key, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [key]: value } : row
    );
    setRows(updatedRows);
    localStorage.setItem('droneRows', JSON.stringify(updatedRows));
  };

  // Add a new row with initial values
  const handlePropellorDamageBlur = (index) => {
    if (index === rows.length - 1) {
      setRows((prevRows) => [...prevRows, { ...initialRow }]);
      localStorage.setItem('droneRows', JSON.stringify([...rows, initialRow]));
    }
  };

  return (
    <div>
      <br />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 drone-table">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Last battery change
            </th>
            <th scope="col" className="px-6 py-3">
              Last motor change
            </th>
            <th scope="col" className="px-6 py-3">
              Attachments Condition
            </th>
            <th scope="col" className="px-6 py-3">
              Propeller Damage
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-15 py-4">
                <input
                  type="text"
                  value={row.lastBatteryChange}
                  onChange={(e) => handleInputChange(index, 'lastBatteryChange', e.target.value)}
                />
              </td>
              <td className="px-15 py-4">
                <input
                  type="text"
                  value={row.lastMotorChange}
                  onChange={(e) => handleInputChange(index, 'lastMotorChange', e.target.value)}
                />
              </td>
              <td className="px-15 py-4">
                <input
                  type="text"
                  value={row.attachmentsCondition}
                  onChange={(e) => handleInputChange(index, 'attachmentsCondition', e.target.value)}
                />
              </td>
              <td className="px-15 py-4">
                <input
                  type="text"
                  value={row.propellorDamage}
                  onChange={(e) => handleInputChange(index, 'propellorDamage', e.target.value)}
                  onBlur={() => handlePropellorDamageBlur(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       >Save</button>
    </div>
  );
};

export default Drone;