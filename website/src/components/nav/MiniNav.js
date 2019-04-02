/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import MiniNavLink from './MiniNavLink'
import logoImg from '../../assets/icons/nivo-logo.png'
import nav from '../../data/nav.yml'

const Wrapper = styled.aside`
    position: fixed;
    top: 0;
    box-shadow: ${({ theme }) => theme.cardShadow};
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    z-index: 30;
    background: ${({ theme }) => theme.colors.cardBackground};

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            display: none;
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            display: none;
        }
    }
`

const Container = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    padding-bottom: 20px;
    overflow-x: hidden;
    overflow-y: auto;
`

const Logo = styled(Link)`
    cursor: pointer;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: block;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    background-image: url(${logoImg});
    background-size: 52%;
    background-position: center center;
    background-repeat: no-repeat;
`

class MiniNav extends Component {
    render() {
        return (
            <Wrapper>
                <Logo to="/">
                    <span className="sprite-icons-nivo-logo" />
                </Logo>
                <Container>
                    {nav.components.map(item => {
                        return <MiniNavLink key={item.path} {...item} />
                    })}
                </Container>
            </Wrapper>
        )
    }
}

export default MiniNav
