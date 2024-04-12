/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { groupByDate } from '../../helper/groupBy'
import { randomColorsArray } from '../../helper/color'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const BarChart = ({
  by = 'hours',
  items = [],
  role = 'admin',
  groupBy = groupByDate,
  title = 'Sales statistics',
  sliceEnd = 6,
  value = ''
}) => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  })

  const init = () => {
    const newData = groupBy(items, by, role, sliceEnd)
    setData({
      labels: newData.reduce(
        (labels, currentData) => [...labels, currentData[0]],
        []
      ),
      datasets: [
        {
          data: newData.reduce(
            (datas, currentData) => [...datas, currentData[1]],
            []
          ),
          label: title,
          backgroundColor: randomColorsArray(Object.values(newData).length)
        }
      ]
    })
  }

  useEffect(() => {
    init()
  }, [items, by, role, sliceEnd])

  return (
    <div
      style={{
        boxShadow: '0 0 20px -4px rgba(0,0,0,.15)',
        borderRadius: '0.25rem',
        backgroundColor: '#fff',
        width: '99%'
      }}
    >
      <h5
        style={{
          textAlign: 'start',
          padding: '10px 0 10px 10px',
          borderBottom: '1px solid #ccc',
          textTransform: 'capitalize'
        }}
      >
        {value}s overview
      </h5>
      <Bar
        data={data}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: title
          },
          scales: {
            x: {
              display: false
            },
            y: {
              beginAtZero: true
              // ticks: {
              //   stepSize: 1
              // }
            }
          }
        }}
      />
    </div>
  )
}

export default BarChart
