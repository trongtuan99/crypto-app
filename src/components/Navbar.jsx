import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import {Link} from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons'

import icon from '../images/bitcoin.png'

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large'/>
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Crypto Life</Link>
        </Typography.Title>
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined/>}>
            <Link to='/'>Trang Chủ</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined/>}>
            <Link to='/cryptocurrencies'>Tiền điện tử hiện tại</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined/>}>
            <Link to='/exchanges'>Giao Dịch</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined/>}>
            <Link to='/news'>Tin Tức</Link>
          </Menu.Item>
        </Menu>
        {/* <Button className='menu-control'>

        </Button> */}
      </div>
    </div>
  )
}

export default Navbar