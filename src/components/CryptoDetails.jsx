import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Row, Col, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import Loader from './Loader'
import LineChart from './LineChart'

const {Title, Text} = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod})
  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Giá trên USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Xếp hạng', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Khối lượng giao dịch trong 24h', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Vốn hóa thị trường ', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'Giá Cao nhất đuợc ghi nhận', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Số lượng thị trường', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Số lượng sàn giao dịch', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Được chấp thuận', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Tổng cung', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Lưu hành', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  console.log(data);

  if(isFetching) return <Loader/>
  return (
      <Col className='coin-detail-container'>
          <Col className='coin-heading-container'>
            <Title className='coin-name' level={2}>
              {cryptoDetails.name} ({cryptoDetails.symbol}) Chi Tiết
            </Title>
            <p>
              {cryptoDetails.name} - Chi tiết về giá,
              xem thống kê giá trị, vốn hoá thị trường và nguồn cung cấp của {cryptoDetails.name} trực tuyến nhanh nhất !
            </p>
          </Col>
          <Select 
            defaultValue='7d' 
            className='select-timeperiod'
            placeholder={timePeriod}
            onChange={(value)=> setTimePeriod(value)}
          >
            {time.map((date, i) => <Option key={i}>{date}</Option>)}
          </Select>
          <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
          <Col className='stats-container'>
            <Col className='coin-value-statistics'>
              <Col className='coin-value-statistics-heading'>
                  <Title level={3} className='coin-detailes-heaidng'>
                    Thống kê giá trị của {cryptoDetails.name} 
                  </Title>
                  <p>
                  Thống kê tổng quan của {cryptoDetails.name}, Về tiền tệ cơ sở và định giá, xếp hạng và khối lượng giao dịch.
                  </p>
              </Col>
                {stats.map(({icon, title, value})=>(
                  <Col className='coin-stats'>
                    <Col className='coin-stats-name'>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className='stats'>{value}</Text>
                  </Col>
                ))}
            </Col>
            <Col className='other-stats-info'>
              <Col className='coin-value-statistics-heading'>
                  <Title level={3} className='coin-detailes-heaidng'>
                      Một số thống kê khác của {cryptoDetails.name}
                  </Title>
              </Col>
                {genericStats.map(({icon, title, value})=>(
                  <Col className='coin-stats'>
                    <Col className='coin-stats-name'>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className='stats'>{value}</Text>
                  </Col>
                ))}
            </Col>
          </Col>
          <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                  <Title className='coin-desc-heading'>
                    {cryptoDetails.name} là gì ?
                  </Title>
                  {HTMLReactParser(cryptoDetails.description)}
                </Row>
                <Col className="coin-links">
                  <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
                  {cryptoDetails.links?.map((link) => (
                    <Row className="coin-link" key={link.name}>
                      <Title level={5} className="link-name">{link.type}</Title>
                      <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                    </Row>
                  ))}
                </Col>
            </Col>
      </Col>
  )
}

export default CryptoDetails