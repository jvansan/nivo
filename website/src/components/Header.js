/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import GitHubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import * as nav from '../data/nav'

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
    z-index: 11;
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
                <HeaderNav>
                    <Link className="HeaderNav__Item" to="/about">
                        About
                    </Link>
                    <Link className="HeaderNav__Item" to="/components">
                        Components
                    </Link>
                    <span className="HeaderNav__Item">
                        Guides
                        <span className="HeaderNav__Item__Sub">
                            {nav.guides.map(guide => (
                                <Link
                                    key={guide.path}
                                    className="HeaderNav__Item__Sub__Item"
                                    to={guide.path}
                                >
                                    {guide.label}
                                </Link>
                            ))}
                        </span>
                    </span>
                    <Link className="HeaderNav__Item" to="/faq">
                        FAQ
                    </Link>
                    <a
                        className="HeaderNav__Item"
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
