/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import '../styles/index.css'
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header'
import GlobalStyle from '../theming/GlobalStyle'
import theme from '../theming/theme'
import { themeContext } from '../theming/context'
import media from '../theming/mediaQueries'
import MiniNav from './nav/MiniNav'

const Content = styled.div`
    margin-top: ${({ theme }) => theme.dimensions.headerHeight}px;
    margin-left: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    overflow-x: hidden;

    .isCapturing & {
        background: transparent;
    }

    ${media.tablet`
        & {
            margin-left: 0;
        }
    `}

    ${media.mobile`
        & {
            margin-left: 0;
        }
    `}
`

const InnerContent = styled.div`
    padding-top: 10px;
    background-image: linear-gradient(-90deg, #dc5a32, #c44a67);
    background-size: 100% 150px;
    background-repeat: no-repeat;
    background-position: top left;
`

const currentTheme = theme.light

const Layout = ({ children }) => {
    return (
        <themeContext.Provider value={currentTheme}>
            <ThemeProvider theme={currentTheme}>
                <>
                    <GlobalStyle />
                    <Header />
                    <MiniNav />
                    <Content>
                        <InnerContent>{children}</InnerContent>
                    </Content>
                </>
            </ThemeProvider>
        </themeContext.Provider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
