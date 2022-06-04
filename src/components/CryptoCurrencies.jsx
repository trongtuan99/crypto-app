import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Typography } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'

const {Title} = Typography 

const CryptoCurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  const [cryptos,setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  console.log(cryptos);

  useEffect(()=>{
    const fillterData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(fillterData) 

  },[cryptosList, searchTerm])

  if(isFetching) return 'loading'

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Title level={2} className="curency-title">Tất cả tiền điện tử</Title>
          <Input placeholder='Tìm kiếm tiền điện tử ...' onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>
      )}
      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency)=>(
          <Col key={currency.id} xs={24} sm={12} lg={6} className="crypto-card">
            <Link to={`crypto/${currency.id}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl}/>}  
                hoverable
              >
                <p>Giá hiện tại: {millify(currency.price)} $</p>
                <p>Tên ngắn gọn: {currency.symbol}</p>
                <p>Tổng vốn hoá: {millify(currency.marketCap)}</p>
                <p>Thay đổi trong 24h: {millify(currency.change)} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies