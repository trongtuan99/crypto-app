import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
const {Title} = Typography 
const HomePage = () => {  
  const {data, isFetching } = useGetCryptosQuery()

  console.log(data);

  return (
    <>
      <Title level={2} className='heading'>Tiền điện tử toàn cầu</Title>
      <Row>
        <Col span={12}> <Statistic title="Tổng số tiền điện tử" value={5}/></Col>
        <Col span={12}> <Statistic title="Tổng số Giao dịch" value={5}/></Col>
        <Col span={12}> <Statistic title="Tổng vốn hóa thị trường" value={5}/></Col>
        <Col span={12}> <Statistic title="Tổng khối lượng 24h" value={5}/></Col>
        <Col span={12}> <Statistic title="Tổng số thị trường" value={5}/></Col>
      </Row>
    </>
  )
}

export default HomePage