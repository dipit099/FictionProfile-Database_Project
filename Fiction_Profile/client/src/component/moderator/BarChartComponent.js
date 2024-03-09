import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ type_id, insertCount, updateCount, deleteCount }) => {
    const data = [
        { name: 'Insert', value: insertCount },
        { name: 'Update', value: updateCount },
        { name: 'Delete', value: deleteCount }
    ];

    // Calculate the maximum count among all data points
    const maxCount = Math.max(insertCount, updateCount, deleteCount);

    // Calculate the Y-axis domain with a regular interval (e.g., 1000)
    // const yAxisInterval = 5;
    // const yDomain = [0, Math.ceil(maxCount / yAxisInterval) * yAxisInterval];

    return (
        <div>
            <h3>Type ID: {type_id}</h3>
            <BarChart width={500} height={400} data={data}>
                <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff', fontSize: 18 }} />
                <YAxis  stroke="#fff" tick={{ fill: '#fff', fontSize: 18 }} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarChartComponent;
