import React from 'react';

const LeaveCards = () => {
  const leaveTypes = [
    {
      id: 'sick',
      shortName: 'SL',
      name: 'Sick Leave',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-500',
      stats: {
        available: 10.0,
        carryForward: 0.0,
        total: 10.0,
        taken: 0
      }
    },
    {
      id: 'casual',
      shortName: 'CL',
      name: 'Casual Leave',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-500',
      stats: {
        available: 1.0,
        carryForward: 0.0,
        total: 1.0,
        taken: 0
      }
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 pr-100">
      {leaveTypes.map((leave) => (
        <div 
          key={leave.id} 
          className="flex-1 rounded-lg border border-gray-200 p-4 bg-white shadow-sm"
        >
          <div className="flex items-center">
            <div className={`${leave.bgColor} ${leave.textColor} w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold mr-4`}>
              {leave.shortName}
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-lg">{leave.name}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <p>Available Leave Days : {leave.stats.available}</p>
                <p>Carryforward Leave Days : {leave.stats.carryForward}</p>
                <p>Total Leave Days : {leave.stats.total}</p>
                <p>Total Leave taken : {leave.stats.taken}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveCards;