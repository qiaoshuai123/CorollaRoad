import React from 'react'
import reactDom from 'react-dom'
import { HashRouter, BrowserHistory } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { renderRoutes } from 'react-router-config'
import mainRouter from './mainRouter'

import './app.css'

reactDom.render(
  <AppContainer>
    <ConfigProvider locale={zhCN}>
      <HashRouter basename="" history={BrowserHistory}>
        {renderRoutes(mainRouter)}
      </HashRouter>
    </ConfigProvider>
  </AppContainer>
  , document.getElementById('content'),
)
