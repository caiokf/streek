import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  PrivateRoute,
  LoginRoute,
  LogoutRoute,
  LandingPageRoute,
  AuthCallbackRoute,
  AuthProvider,
} from 'react-router-auth0'

import Home from './views/pages/home'
import store, { history } from './modules/store'
import Layout from './views/layout'

const app = (
  <Layout>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
    </Switch>
  </Layout>
)

const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>

        <AuthProvider
          domain={'streek.auth0.com'}
          clientId={'tdPvd4pq09pzWl7QwjzL5iyaRdU6IRhK'}
          audience={'https://streek.auth0.com/userinfo'}
        >
          <Switch>
            <LandingPageRoute exact path="/"
              landingUrl="http://localhost:8080"
              loggedInPath="/home" />

            <LoginRoute exact path="/login" />
            <LogoutRoute path='/logout' redirect='/' />
            <AuthCallbackRoute path='/auth0-callback' />

            {app}
          </Switch>
        </AuthProvider>

      </ConnectedRouter>
    </Provider>
  )
}

export default Router