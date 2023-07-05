// LIBRARIES
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Pie } from 'react-chartjs-2';
// REACT
import { useState, useMemo } from "react";

Chart.register(CategoryScale);

export default function ChartExpByCategory(props) {
    const Data = useMemo(() => props.summaryCategory, [props.summaryCategory])
    const [chartData, setChartData] = useState({
        labels: Data.map(data => data.category),
        datasets: [
            {
                data: Data.map(data => {
                    const total = Data.reduce((sum, value) => value._sum.amount + sum, 0)
                    let percentage = ((data._sum.amount / total) * 100).toFixed(0);
                    return percentage
                }),
                backgroundColor: [
                    "#D9D9D9",
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    })

    return (
        <>
            <Pie
                data={chartData}
                options={{
                    radius: "80%",
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: "enabled",
                        title: {
                            display: false,
                            text: "Expenses by category",
                        }
                    }
                }}
                data-testid='summaryCategoryExpenses'
            />
        </>
    )
}