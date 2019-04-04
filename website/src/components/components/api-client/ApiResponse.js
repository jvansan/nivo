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
import media from '../../../theming/mediaQueries'

const Container = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    --partialWidth: calc(var(--innerWidth) * 0.6);
    width: var(--partialWidth);
    background: ${({ theme }) => theme.colors.cardAltBackground};
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.45);
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;

    ${media.tablet`
        & {
            right: 0;
            bottom: 0;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.45);
            width: 60%;
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            right: auto;
            bottom: auto;
            width: auto;
            height: auto;
            border-left-width: 0;
            z-index: 0;
        }
    `}
`

class ApiResponse extends Component {
    render() {
        const { responseStatus, response } = this.props

        let responseContent = 'no response available'
        if (response) {
            responseContent = JSON.stringify(response, null, '  ')
        }

        return (
            <Container>
                <div>Response ({responseStatus ? responseStatus : 'n/a'})</div>
                <div className="code-snippet">
                    <pre>{responseContent}</pre>
                </div>
            </Container>
        )
    }
}

ApiResponse.propTypes = {}

ApiResponse.defaultProps = {}

export default ApiResponse
