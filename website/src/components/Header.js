/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GitHubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import { miscItems } from '../SiteMap'
import logoImg from '../assets/icons/nivo-logo.png'

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--header-background-color);
    background-image: linear-gradient(-90deg, #dc5a32, #c44a67);
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 10;
`

const Logo = styled(Link)`
    cursor: pointer;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: block;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    background-image: url(${logoImg});
    background-size: 34%;
    background-position: center center;
    background-repeat: no-repeat;

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

const HeaderNav = styled.nav`
    position: absolute;
    top: 0;
    right: 50px;
    height: var(--header-height);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            right: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            display: none;
        }
    }
`

export default class Header extends Component {
    render() {
        return (
            <Container>
                <Logo to="/">
                    <span className="sprite-icons-nivo-logo" />
                </Logo>
                <HeaderNav>
                    {miscItems.map(item => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <span className="HeaderNav__Item" key={item.className}>
                                    {item.label}
                                    <span className="HeaderNav__Item__Sub">
                                        {item.children.map(child => (
                                            <Link
                                                className="HeaderNav__Item__Sub__Item"
                                                key={child.className}
                                                to={child.path}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </span>
                                </span>
                            )
                        }

                        return (
                            <Link
                                className={`HeaderNav__Item HeaderNav__Item--${item.className}`}
                                key={item.className}
                                to={item.path}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                    <a
                        className="HeaderNav__Item HeaderNav__Item--storybook"
                        href="https://nivo.rocks/storybook/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        storybook
                    </a>
                    <a
                        className="HeaderNav__Item"
                        href="https://github.com/plouc/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        className="HeaderNav__Item"
                        href="https://twitter.com/benitteraphael"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                    >
                        <TwitterIcon />
                    </a>
                </HeaderNav>
            </Container>
        )
    }
}
