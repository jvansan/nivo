/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import MiniNavLink from './MiniNavLink'
import { getSectionItems } from '../../SiteMap'

const miniNavItems = getSectionItems('Components').map((item, i) => {
    return { ...item, index: i }
})

const Wrapper = styled.aside`
    position: fixed;
    top: 0;
    box-shadow: ${({ theme }) => theme.cardShadow};
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.dimensions.miniNavWidth + 1}px;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
`

class MiniNav extends Component {
    render() {
        return (
            <Wrapper>
                <Container>
                    {miniNavItems.map(item => {
                        return <MiniNavLink key={item.path} style={{}} {...item} />
                    })}
                </Container>
            </Wrapper>
        )
    }
}

export default MiniNav
