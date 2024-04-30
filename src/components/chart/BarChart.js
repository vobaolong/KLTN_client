/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { groupByDate } from '../../helper/groupBy'
// import { randomColorsArray } from '../../helper/color'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import CrosshairPlugin from 'chartjs-plugin-crosshair'
const CustomCrosshairPlugin = function (plugin) {
  const originalAfterDraw = plugin.afterDraw
  plugin.afterDraw = function (chart, easing) {
    if (chart && chart.crosshair) {
      originalAfterDraw.call(this, chart, easing)
    }
  }
  return plugin
}
Chart.register(...registerables, CustomCrosshairPlugin(CrosshairPlugin))

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
      labels: newData.map((item) => item[0]),
      datasets: [
        {
          data: newData.map((item) => item[1]),
          label: 'Doanh số bán hàng',
          // backgroundColor: randomColorsArray(newData.length),
          backgroundColor: '#3b82f6'
        },
        role === 'vendor' && {
          data: newData.map((item) => item[2]),
          label: 'Chiết khấu',
          // backgroundColor: randomColorsArray(newData.length),
          backgroundColor: '#60a5fa'
        }
      ].filter(Boolean)
    })
  }
  useEffect(() => {
    init()
  }, [items, by, role, sliceEnd])

  return (
    <div className='bg-body box-shadow rounded w-100'>
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
          responsive: true,
          legend: { display: false },
          title: {
            display: true,
            text: title
          },
          scales: {
            x: {
              display: false,
              stacked: true
            },
            y: {
              beginAtZero: true,
              stacked: true
            }
          },
          elements: {
            bar: {
              // borderRadius: 2
            }
          },
          plugins: {
            crosshair: {
              enabled: true,
              mode: 'xy',
              line: {
                color: '#F66',
                width: 1
              },
              sync: {
                enabled: true,
                group: 1,
                suppressTooltips: false
              },
              zoom: {
                enabled: true
              }
            }
          }
        }}
      />
    </div>
  )
}

export default BarChart
