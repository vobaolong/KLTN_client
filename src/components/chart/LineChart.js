import { useState, useEffect } from 'react'
import { groupByDate } from '../../helper/groupBy'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

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
					fill: false,
					tension: 0.4,
					borderWidth: 2,
					borderColor: '#1162D5'
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
			<h6
				style={{
					textAlign: 'start',
					padding: '10px 0 10px 10px',
					borderBottom: '1px solid #ccc',
					textTransform: 'capitalize'
				}}
			>
				{value}s overview
			</h6>
			<Line
				data={data}
				options={{
					title: {
						display: true,
						text: title
					},
					legend: {
						display: true,
						position: 'bottom'
					},
					scales: {
						x: {
							display: false
						},
						y: {
							beginAtZero: true
						}
					}
				}}
			/>
		</div>
	)
}

export default LineChart
