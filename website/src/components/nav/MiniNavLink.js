/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'

const Label = styled.span`
    display: flex;
    position: absolute;
    left: 110%;
    top: 50%;
    height: 30px;
    font-size: 13px;
    font-weight: 600;
    white-space: pre;
    align-items: center;
    background: var(--accent-color);
    color: white;
    text-decoration: none;
    margin-top: -15px;
    padding: 0 10px;
    border-radius: 2px;
    z-index: 3;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    min-width: var(--mini-nav-item-size);
    pointer-events: none;
    transform: translate3d(20px, 0, 0);
    opacity: 0;
    transition: opacity 200ms, transform 200ms;
`

const Item = styled(Link)`
    cursor: pointer;
    width: var(--mini-nav-item-size);
    height: var(--mini-nav-item-size);
    position: relative;
    text-decoration: none;

    &:before {
        content: '';
        position: absolute;
        display: block;
        width: var(--mini-nav-item-size);
        height: var(--mini-nav-item-size);
        border-radius: 100%;
        background: ${({ theme }) => theme.colors.background};
        opacity: 0;
        top: 0;
        left: 0;
        transform: scale(0.6);
        transition: opacity 200ms, transform 400ms;
        z-index: 1;
    }

    &:hover:before {
        opacity: 1;
        transform: scale(0.88);
    }

    &:hover ${Label} {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`

const Icon = styled.span`
    display: block;
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    transform: scale(0.76);
    transform-origin: top left;
    z-index: 2;
    pointer-events: none;
`

const MiniNavLink = ({ path, className, label, style }) => {
    const [isHover, setIsHover] = useState(false)
    const onMouseEnter = useCallback(() => setIsHover(true), [setIsHover])
    const onMouseLeave = useCallback(() => setIsHover(false), [setIsHover])

    return (
        <Route
            path={path}
            exact={false}
            children={({ match }) => (
                <Item
                    to={path}
                    style={style}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <Icon
                        className={`sprite-icons-${className}-${match || isHover ? 'red' : 'grey'}`}
                    />
                    <Label>{label}</Label>
                </Item>
            )}
        />
    )
}

export default MiniNavLink
