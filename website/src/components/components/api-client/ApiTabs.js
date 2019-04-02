/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const tabs = ['preview', 'body', 'data']

const Wrapper = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    right: 0;
    width: 60%;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    width: calc(var(--innerWidth) * 0.6);
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.55);
    z-index: 10;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            top: ${({ theme }) => theme.dimensions.headerHeight}px;
            right: 0;
            width: 60%;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.55);
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            position: relative;
            top: auto;
            right: auto;
            width: auto;
            height: 460px;
            z-index: 0;
            border-top: 1px solid ${({ theme }) => theme.colors.border};
        }
    }
`

const Nav = styled.nav`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    display: flex;
    font-size: 15px;
    color: #aaa;
    position: relative;
`

const NavItem = styled.span`
    cursor: pointer;
    height: 46px;
    display: block;
    position: relative;
    padding-left: 46px;
    padding-right: 14px;
    padding-top: 11px;
    background: ${({ isCurrent, theme }) =>
        isCurrent ? theme.colors.cardBackground : 'transparent'};

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`

const Icon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    transform: scale(0.44);
    transform-origin: top left;
    margin: 12px 0 0 12px;
`

const Content = styled.div`
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
`

export default class ApiTabs extends Component {
    static propTypes = {
        chartClass: PropTypes.string.isRequired,
        data: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    }

    static defaultProps = {
        mode: '',
        nodeCountWording: 'nodes',
    }

    state = {
        tab: 'preview',
        hoverTab: null,
    }

    handleTabToggle = tab => {
        this.setState({ tab })
    }

    handleTabHover = hoverTab => {
        this.setState({ hoverTab })
    }

    render() {
        const { chartClass, data, body, children } = this.props
        const { tab: currentTab, hoverTab } = this.state

        let content
        if (currentTab === 'preview') {
            content = <Content>{children}</Content>
        } else if (currentTab === 'body') {
            content = (
                <div className="code-snippet">
                    <pre>{JSON.stringify(body, null, '  ')}</pre>
                </div>
            )
        } else if (currentTab === 'data') {
            content = (
                <div className="json-data_json code-snippet">
                    <pre>{data}</pre>
                </div>
            )
        }

        return (
            <Wrapper className={`chart-tabs--${currentTab}`}>
                <Nav>
                    {tabs.map(tab => {
                        const isCurrent = tab === currentTab
                        const icon = tab === 'preview' ? chartClass : 'data'
                        const iconColor = isCurrent || hoverTab === tab ? 'red' : 'grey'

                        return (
                            <NavItem
                                key={tab}
                                className="no-select"
                                isCurrent={isCurrent}
                                onClick={() => {
                                    this.handleTabToggle(tab)
                                }}
                                onMouseEnter={() => {
                                    this.handleTabHover(tab)
                                }}
                                onMouseLeave={() => {
                                    this.handleTabHover(null)
                                }}
                            >
                                <Icon className={`sprite-icons-${icon}-${iconColor}`} />
                                {tab}
                            </NavItem>
                        )
                    })}
                </Nav>
                {content}
            </Wrapper>
        )
    }
}
