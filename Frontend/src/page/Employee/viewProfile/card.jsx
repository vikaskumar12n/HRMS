import React from 'react';

export default function card() {
  return (
    <div className="flex items-center flex-col md:flex-row">
      <div className="flex items-center bg-white text-balance  shadow-sm rounded-lg border border-black w-80 p-2">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-red-300 text-xl mr-4">SL</div>
        <div className="text-sm text-black ">
          <h1 className="text-2xl mb-2">Sick Leave</h1>
          <p>Available Leave Days : </p>
          <p>Carryforward Leave Days : </p>
          <p>Total Leave Days : </p>
          <p>Total Leave taken : </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
