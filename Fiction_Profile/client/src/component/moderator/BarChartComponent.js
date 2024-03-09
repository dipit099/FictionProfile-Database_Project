import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ type_id, insertCount, updateCount, deleteCount }) => {
    const data = [
        { name: 'Insert', value: insertCount },
        { name: 'Update', value: updateCount },
        { name: 'Delete', value: deleteCount }
    ];

    return (
        <div>
            <h3>Type ID: {type_id}</h3>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarChartComponent;