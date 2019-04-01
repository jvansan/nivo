/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import './styles/index.css'
import './polyfills'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import MiniNav from './components/nav/MiniNav'
import Home from './components/pages/Home'
import Header from './components/Header'
import MobileNav from './components/nav/mobile/MobileNav'
import ScrollToTop from './components/ScrollToTop'
import { getRoutes } from './SiteMap'
import GlobalStyle from './theming/GlobalStyle'
import theme from './theming/theme'
// import registerServiceWorker from './registerServiceWorker'

const Content = styled.div`
    margin-top: var(--header-height);
    margin-left: var(--mini-nav-width);
    overflow-x: hidden;

    .isCapturing & {
        background: transparent;
    }

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            margin-left: 0;
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            margin-left: 0;
        }
    }
`

const App = ({ location }) => {
    const isCapturing = location !== undefined && location.search.indexOf('capture') !== -1

    return (
        <ThemeProvider theme={theme.light}>
            <>
                <GlobalStyle />
                <div className={isCapturing ? 'isCapturing' : ''}>
                    <Helmet titleTemplate="%s | nivo" />
                    <Header />
                    <MiniNav location={location} />
                    <Content isCapturing={isCapturing}>
                        <Switch>{getRoutes()}</Switch>
                    </Content>
                    <MobileNav />
                </div>
            </>
        </ThemeProvider>
    )
}

render(
    <Router>
        <ScrollToTop>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="*" component={App} />
            </Switch>
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
)

// registerServiceWorker()
