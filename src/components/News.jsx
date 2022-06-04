import React from 'react'
import { Select, Row, Col, Typography, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title } = Typography
const { Option } = Select
const demoImage = 'https://hanoispiritofplace.com/wp-content/uploads/2017/12/hinh-anh-bitcoin-1.jpg'
const News = ({simplified}) => {
  const {data: cryptoNews } = useGetCryptoNewsQuery({newsCategory: 'Cryptocurrency', count: simplified ? 6 : 18})
  console.log(cryptoNews);

  if(!cryptoNews?.value) return 'loading ...'
  return (
    <Row gutter={[24,24]}>
      {cryptoNews.value.map((news, i)=>(
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel='noreferrer'>
              <div className='news-img-container'>
                <Title className="news-title" level={5}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="new" style={{maxWidth: 200, maxHeight: 100}} />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
} 

export default News