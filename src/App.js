import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import { Navbar, HomePage, CryptoCurrencies, Exchanges, CryptoDetails, News } from "./components";
import './App.css'
import 'antd/dist/antd.css'

function App() {
  return ( 
      <div className="app">
        <div className="navbar">
          <Navbar/>
        </div>
        <div className="main">
          <Layout>
              <div className="routes">
                <Routes>
                  <Route exact path="/" element={<HomePage/>}/>
                  <Route exact path="/cryptocurrencies" element={  <CryptoCurrencies/>}/>
                  <Route exact path="/exchanges" element={<Exchanges/>}/>
                  <Route exact path="/crypto/:coinId" element={<CryptoDetails/>}/>
                  <Route exact path="/news" element={<News/>}/>
                </Routes>
              </div>
          </Layout>
        <div className="footer" >
            <Typography.Title level={5} style={{ color:'white', textAlign:'center' }}>
              Crypto Life <br />
            </Typography.Title>
            <Space>
              <Link to='/'>Trang chủ</Link>
              <Link to='/cryptocurrencies'>Tất cả Crypto</Link>
              <Link to='/news'>Tin tức</Link>
            </Space>
        </div>
        </div>

      </div>
  )
}

export default App