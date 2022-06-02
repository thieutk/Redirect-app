import { FC } from 'react'
import {AppProps} from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import Link from 'next/link'
import {BackTop, Layout, Menu} from 'antd'
import 'antd/dist/antd.css'
import '../styles/main.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout className="layout">
      <NextNprogress />
      <Layout.Content style={{ padding: '30px 50px 0' }}>
      <div style={{
        minHeight: '280px',
        background: '#fff',
        padding: '24px',
      }}>
        <Component {...pageProps} />
        </div>
        <BackTop />
      </Layout.Content>
      <Layout.Footer>
        ©︎ 2022 Created by HIEU
      </Layout.Footer>
    </Layout>
  )
}

export default MyApp
