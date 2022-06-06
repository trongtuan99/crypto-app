import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const LineChart = ({coinHistory, coinName, currentPrice}) => {
  ChartJS.register(...registerables);
  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }
  const data = {
    labels: coinTimestamp,
    datasets:[
      {
        label: 'Giá USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  }
  const options = {
    scales: {
      yAxes: [
        {
          ticks:{
            beginAtZezo : true
          }
        }
      ]
    }
  }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>Biểu đồ giá {coinName}</Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-price'>Giá {coinName} hiện tại : {currentPrice}$</Title>
        </Col>
      </Row>
      <Line data={data} options={options}/>
    </>
  )
}

export default LineChart