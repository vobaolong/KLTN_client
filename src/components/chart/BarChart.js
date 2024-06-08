/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { groupByDate } from '../../helper/groupBy'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  useEffect(() => {
    const newData = groupBy(items, by, role, sliceEnd)
    setData({
      labels: newData.map((item) => item[0]),
      datasets: [
        {
          data: newData.map((item) => item[1]),
          label: title,
          backgroundColor: '#3b82f6'
        },
        role === 'seller' && {
          data: newData.map((item) => item[2]),
          label: 'Chiết khấu',
          backgroundColor: '#ffbbbb'
        }
      ].filter(Boolean)
    })
  }, [items, by, role, sliceEnd])

  return (
    <div className='bg-body box-shadow rounded w-100'>
      <h5 className='text-capitalize border-bottom p-3 text-start'>
        {value} {t('breadcrumbs.overview')}
      </h5>
      <Bar
        data={data}
        options={{
          responsive: true,
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
          }
        }}
      />
    </div>
  )
}

export default BarChart
