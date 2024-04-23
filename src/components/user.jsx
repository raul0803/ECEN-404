import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const User = () => {
    return (
<div class="flex items-center h-screen w-full justify-center">

<div class="max-w-xs">
    <div className="bg-red-800 shadow-xl rounded-lg py-3">
        <div class="photo-wrapper p-2">
            <img class="w-32 h-32 rounded-full mx-auto" src="raul.png" alt="Raul Cruz"/>
        </div>
        <div class="p-2">
            <h3 class="text-center text-xl text-white-900 font-medium leading-8">Raul Cruz</h3>
            <div class="text-center text-white-400 text-xs font-semibold">
                <p>FAA Certified</p>
            </div>
            <table class="text-xs my-3">
                <tbody><tr>
                    <td class="px-2 py-2 text-white-500 font-semibold">License Number</td>
                    <td class="px-2 py-2 text-white-500 font-semibold">19397234</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-white-500 font-semibold">Phone</td>
                    <td class="px-2 py-2 text-white-500 font-semibold">+956-334-2385</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-white-500 font-semibold">Email</td>
                    <td class="px-2 py-2 text-white-500 font-semibold">cruzsmiley3@gmail.com</td>
                </tr>
            </tbody></table>


        </div>
    </div>
</div>

</div>
  );
};



export default User;