import { useState, useEffect } from "react"
import { Line, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);



export const CustomChart = ({ chartData }) => {
  return (
    <div>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sensor Timeseries"
            },
            legend: {
              display: true,
              position: "top"
           }
          }
        }}
      />
    </div>
  );
};



export default function App() {
  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("/timeseries")
      const data = await res.json()
      console.log(data);
      setChartData({
        labels: data.data.map((ts) => ts.key),
        datasets: [
          {
            label: "Sensor Data",
            fill: false,
            data: data.data.map((ts) => ts.value),
            borderColor: 'rgb(128, 255, 128)',
          },
          {
            label: "Upper Bound",
            fill: false,
            data: data.data.map((ts) => ts.upperbound),
            borderColor: 'rgb(51, 102, 255)',
          },
          {
            label: "Lower Bound",
            fill: false,
            data: data.data.map((ts) => ts.lowerbound),
            borderColor: 'rgb(51, 102, 255)',
          }
        ]
      });
    }
    fetchPrices()
  }, []);

  const [chartData, setChartData] = useState({datasets: [], });

  return (
    <div className="App">
      <CustomChart chartData={chartData} />
    </div>
  );

}
