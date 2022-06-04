import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import {CryptoCurrencies, News} from '../components'

const {Title} = Typography 

const HomePage = () => {  
  const {data, isFetching } = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats
  if(isFetching) return 'loading ...'

  console.log(data);

  return (
    <>
      <Title level={2} className='heading'>Tổng quan về Crypto</Title>
      <Row>
        <Col span={12}> <Statistic title="Tổng số lượng Crypto" value={globalStats.total}/></Col>
        <Col span={12}> <Statistic title="Tổng số sàn giao dịch" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}> <Statistic title="Tổng vốn hóa thị trường" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}> <Statistic title="Tổng khối lượng giao dịch trong 24h" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}> <Statistic title="Tổng giá trị thị trường" value={millify(globalStats.totalMarkets)}/></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className="home-title">Top 10 Crypto trên thế giới</Title>
        <Title level={3} className="show-more"><Link to = "/cryptocurrencies">Xem  tất cả</Link>
        </Title>
      </div>
      <CryptoCurrencies simplified = {true}/>

      <div className='home-heading-container'>
        <Title level={2} className="home-title">Tin mới nhất về Crypto</Title>
        <Title level={3} className="show-more"><Link to = "/news">Xem tất cả</Link>
        </Title>
      </div>
      <News simplified/>
    </>
  )
}

export default HomePage