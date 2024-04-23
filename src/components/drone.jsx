import React, { useState, useEffect } from 'react';

const Drone = () => {
  const initialRow = {
    lastBatteryChange: '',
    lastMotorChange: '',
    attachmentsCondition: '',
    propellorDamage: '',
  };

  const storedRows = JSON.parse(localStorage.getItem('droneRows'));
  const [rows, setRows] = useState(storedRows || [initialRow]);

  const handleInputChange = (index, key, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [key]: value } : row
      )
    );
  };

  const handlePropellorDamageBlur = (index) => {
    if (index === rows.length - 1) {
      setRows((prevRows) => [...prevRows, { ...initialRow }]);
    }
  };

  useEffect(() => {
    localStorage.setItem('droneRows', JSON.stringify(rows));
  }, [rows]);

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
    </div>
  );
};

export default Drone;
