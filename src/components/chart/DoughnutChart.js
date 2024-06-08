// import { useState, useEffect } from 'react'
// import { groupByDate } from '../../helper/groupBy'
// import { randomColorsArray } from '../../helper/color'
// import { Doughnut } from 'react-chartjs-2'
// import { Chart, registerables } from 'chart.js'
// Chart.register(...registerables)

// const DoughnutChart = ({
//   by = 'hours',
//   items = [],
//   role = 'admin',
//   groupBy = groupByDate,
//   title = 'Sales statistics',
//   sliceEnd = 6
// }) => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: []
//   })

//   const init = () => {
//     const newData = groupBy(items, by, role, sliceEnd)
//     setData({
//       labels: newData.reduce(
//         (labels, currentData) => [...labels, currentData[0]],
//         []
//       ),
//       datasets: [
//         {
//           data: newData.reduce(
//             (datas, currentData) => [...datas, currentData[1]],
//             []
//           ),
//           label: '',
//           backgroundColor: randomColorsArray(Object.values(newData).length)
//         }
//       ]
//     })
//   }

//   useEffect(() => {
//     init()
//   }, [items, by, role, sliceEnd])

//   return (
//     <div style={{ maxWidth: '50%', margin: '0 auto' }}>
//       <Doughnut
//         data={data}
//         options={{
//           title: {
//             display: true,
//             text: title
//           }
//         }}
//       />
//     </div>
//   )
// }

// export default DoughnutChart
