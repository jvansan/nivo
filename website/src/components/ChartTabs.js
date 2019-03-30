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

const tabs = ['chart', 'code', 'data']

const Wrapper = styled.div`
    position: fixed;
    top: 70px;
    right: ${({ theme }) => theme.dimensions.contentMargin}px;
    --innerWidth: calc(
        100% -
            ${({ theme }) => theme.dimensions.contentMargin * 2 + theme.dimensions.miniNavWidth}px
    );
    --halfWidth: calc(var(--innerWidth) * 0.6);
    width: calc(var(--halfWidth) - ${({ theme }) => theme.dimensions.contentMargin / 2}px);
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.contentMargin + 70}px);
    height: calc(var(--innerHeight) * 0.55);
    z-index: 10;
    overflow: hidden;

    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:before {
        content: ' ';
        display: block;
        position: fixed;
        top: 70px;
        right: ${({ theme }) => theme.dimensions.contentMargin}px;
        bottom: ${({ theme }) => theme.dimensions.contentMargin}px;
        --innerWidth: calc(
            100% -
                ${({ theme }) =>
                    theme.dimensions.miniNavWidth + theme.dimensions.contentMargin * 2}px
        );
        --halfWidth: calc(var(--innerWidth) * 0.6);
        width: calc(var(--halfWidth) - ${({ theme }) => theme.dimensions.contentMargin / 2}px);
        background: rgba(0, 0, 0, 0);
        z-index: 0;
        box-shadow: ${({ theme }) => theme.topCardShadow};
    }

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            right: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.contentMarginSmall * 2}px);
            --halfWidth: calc(var(--innerWidth) * 0.6);
            width: calc(
                var(--halfWidth) - ${({ theme }) => theme.dimensions.contentMarginSmall / 2}px
            );
            --innerHeight: calc(
                100% - ${({ theme }) => theme.dimensions.contentMarginSmall + 70}px
            );
            height: calc(var(--innerHeight) * 0.55);
        }
        &:before {
            right: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            bottom: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            right: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.contentMarginSmall * 2}px);
            --halfWidth: calc(var(--innerWidth) * 0.6);
            width: calc(
                var(--halfWidth) - ${({ theme }) => theme.dimensions.contentMarginSmall / 2}px
            );
            background: rgba(0, 0, 0, 0);
            z-index: 0;
            box-shadow: ${({ theme }) => theme.topCardShadow};
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
            box-shadow: ${({ theme }) => theme.topCardShadow};
        }
        &:before {
            display: none;
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

const DiceRollButton = styled.span`
    position: absolute;
    top: 7px;
    right: 10px;
    display: block;
    padding: 8px 10px;
    height: 32px;
    line-height: 1em;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
    font-weight: 600;
    font-size: 15px;
    white-space: pre;

    &:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
        color: ${({ theme }) => theme.colors.accentDark};
    }
`

const NodeCount = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    background-color: ${({ theme }) => theme.colors.cardAltBackground};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    padding: 5px 11px;
`

export default class ChartTabs extends Component {
    static propTypes = {
        chartClass: PropTypes.string.isRequired,
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        code: PropTypes.string.isRequired,
        nodeCount: PropTypes.number,
        nodeCountWording: PropTypes.string.isRequired,
        diceRoll: PropTypes.func,
    }

    static defaultProps = {
        mode: '',
        nodeCountWording: 'nodes',
    }

    state = {
        tab: 'chart',
        hoverTab: null,
    }

    handleTabToggle = tab => {
        this.setState({ tab })
    }

    handleTabHover = hoverTab => {
        this.setState({ hoverTab })
    }

    render() {
        const {
            chartClass,
            data,
            code,
            children,
            diceRoll,
            nodeCount,
            nodeCountWording,
        } = this.props
        const { tab: currentTab, hoverTab } = this.state

        let availableTabs = tabs
        if (data === undefined) {
            availableTabs = availableTabs.filter(t => t !== 'data')
        }

        let content
        if (currentTab === 'chart') {
            content = <Content>{children}</Content>
        } else if (currentTab === 'code') {
            content = (
                <div className="code-snippet">
                    <pre>{code}</pre>
                </div>
            )
        } else if (availableTabs.includes('data') && currentTab === 'data') {
            content = (
                <div className="json-data_json code-snippet">
                    <pre>{JSON.stringify(data, null, '  ')}</pre>
                </div>
            )
        }

        return (
            <Wrapper className={`chart-tabs--${currentTab}`}>
                <Nav>
                    {availableTabs.map(tab => {
                        const isCurrent = tab === currentTab
                        const icon = tab === 'chart' ? chartClass : tab
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
                    {diceRoll && (
                        <DiceRollButton className="no-select" onClick={diceRoll}>
                            roll the dice
                        </DiceRollButton>
                    )}
                </Nav>
                {content}
                {currentTab === 'chart' && nodeCount !== undefined && (
                    <NodeCount>
                        <strong>{nodeCount}</strong>
                        &nbsp;
                        {nodeCountWording}
                    </NodeCount>
                )}
            </Wrapper>
        )
    }
}
