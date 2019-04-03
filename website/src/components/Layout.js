/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import '../styles/index.css'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header'
import GlobalStyle from '../theming/GlobalStyle'
import theme from '../theming/theme'
import MiniNav from './nav/MiniNav'

const Content = styled.div`
    margin-top: ${({ theme }) => theme.dimensions.headerHeight}px;
    margin-left: ${({ theme }) => theme.dimensions.miniNavWidth}px;
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

const InnerContent = styled.div`
    padding-top: 10px;
    background-image: linear-gradient(-90deg, #dc5a32, #c44a67);
    background-size: 100% 150px;
    background-repeat: no-repeat;
    background-position: top left;
`

const Layout = ({ children }) => (
    <ThemeProvider theme={theme.light}>
        <>
            <GlobalStyle />
            <Header />
            <MiniNav />
            <Content>
                <InnerContent>{children}</InnerContent>
            </Content>
        </>
    </ThemeProvider>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
