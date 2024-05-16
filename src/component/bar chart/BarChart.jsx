import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import "./BarChart.css";

const ExpenseBarChart = ({ category, amount }) => {
    const data = [
        {
            name: category,
            value: amount,
        }
    ]
    console.log(category)
    return (
        <div className="category-bar-chart">
            {/* <h4 className="category-name">{category}</h4> */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} layout="vertical">
                        <XAxis type="number" hide axisLine={false} />
                        <YAxis type="category"
                            axisLine={false}
                            width={100}
                            dataKey="name" />

                        <Bar dataKey="value" fill="#8884d8" radius={[0, 10, 10, 0]}
                            barSize={15}
                            className='bars' />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseBarChart;
