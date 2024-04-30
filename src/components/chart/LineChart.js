/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { groupByDate } from '../../helper/groupBy'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { useTranslation } from 'react-i18next'
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

const LineChart = ({
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
  const { t } = useTranslation()
  const init = () => {
    const newData = groupBy(items, by, role, sliceEnd)

    const datasets = [
      {
        data: newData?.map((item) => item[1]),
        label: role === 'admin' ? title : 'Lợi nhuận',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        borderColor: '#1162D5',
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#1162D5'
      }
    ]

    if (role === 'vendor') {
      datasets.push({
        data: newData?.map((item) => item[2]),
        label: 'Chiết khấu',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        borderColor: '#F66',
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#F66'
      })
    }

    setData({
      labels: newData?.map((item) => item[0]),
      datasets
    })
  }

  useEffect(() => {
    init()
  }, [items, by, role, sliceEnd])

  return (
    <div
      style={{ cursor: 'crosshair' }}
      className='bg-body box-shadow rounded w-100'
    >
      <h5
        style={{
          textAlign: 'start',
          padding: '10px 0 10px 10px',
          borderBottom: '1px solid #ccc',
          textTransform: 'capitalize'
        }}
      >
        {value} {t('breadcrumbs.overview')}
      </h5>
      <div className='px-3 py-2'>
        <Line
          data={data}
          options={{
            interaction: {
              mode: 'index',
              intersect: false
            },

            title: {
              display: true,
              text: title
            },
            legend: {
              display: true,
              position: 'bottom'
            },
            responsive: true,
            scales: {
              x: {
                display: false
              },
              y: {
                beginAtZero: true
              }
            },

            elements: {
              point: {
                radius: 1,
                hoverRadius: 3
              }
            },
            plugins: {
              tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false
              },
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
    </div>
  )
}

export default LineChart
