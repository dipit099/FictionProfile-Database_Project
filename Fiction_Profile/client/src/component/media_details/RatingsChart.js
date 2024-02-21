// RatingsChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RatingsChart = ({ ratingsData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={ratingsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
        <XAxis dataKey="rating" stroke="#fff" tick={{ fill: '#fff', fontSize: 20 }} />
        <YAxis stroke="#fff" tick={{ fill: '#fff', fontSize: 20 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8"  />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RatingsChart;
