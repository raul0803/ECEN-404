import React from 'react';
import { useBattery } from 'react-use';


const Table = () => {
  const battery = useBattery();
  const { isSupported, level, charging } = battery;

  
  if (!isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>Not supported</span>
      </div>
    );
  }
  

  return (
    <div>
      <h2>Battery Information</h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-10 py-4">
             Charge level
            </th>
            <th scope="col" className="px-10 py-4">
              Flight Time
            </th>
            <th scope="col" className="px-10 py-4">
              Drone landed
            </th>
            <th scope="col" className="px-10 py-4">
              Drone on/off
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className="px-10 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <strong></strong> <span>{(level * 100).toFixed(0)}%</span>
            </td>
            <td className="px-8 py-4">
            1 hr
            </td>
            <td className="px-8 py-4">
              Yes
            </td>
            <td className="px-8 py-4">
            <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">ON/OFF</span>
</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;