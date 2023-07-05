// LIBRARIES
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Bar } from 'react-chartjs-2';
// REACT
import { useState, useMemo, useEffect } from "react";

Chart.register(CategoryScale);

export default function ChartEvoExpenses(props) {
    const Data = useMemo(() => props.summaryMonth, [props.summaryMonth])
    useEffect(() => {
        setChartData({
            labels: Data.map(data => data.month),
            datasets: [
                {
                    label: "Expenses by month",
                    data: Data.map(data => data._sum.amount),
                    backgroundColor: [
                        "black",
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }
            ]
        })
    }, [Data])
    const [chartData, setChartData] = useState({
        labels: Data.map(data => data.month),
        datasets: [
            {
                label: "Expenses by month",
                data: Data.map(data => data._sum.amount),
                backgroundColor: [
                    "black",
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    })

    return (
        <>
            <Bar 
                data={chartData}
                options={{
                    indexAxis: "y",
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                            text: "Expenses by month",
                        }
                    }
                }}
                data-testid='summaryEvoExpenses'
            />
        </>
    )
}