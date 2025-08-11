import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const WorkingHoursCharts = ({ attendance }) => {
   
  const data = attendance?.map(item => {
    return {
      date: new Date(item.createdAt).toLocaleDateString("en-IN"),
      hours: item.workingHours || 0
    };
  }) || [];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Working Hours Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="hours" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkingHoursCharts;
