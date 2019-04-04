/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import media from '../../theming/mediaQueries'

const Container = styled.div`
    flex-direction: column;
    color: #fff;
    margin-bottom: 50px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    height: 130px;
    padding: 0 30px;

    ${media.tablet`
        & {
            padding: 0 20px;
        }
    `}

    ${media.mobile`
        & {
            padding: 0 20px;
        }
    `}
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    width: 100%;

    ${media.tablet`
        .chart__title {
            justify-content: space-between;
        }
    `}

    ${media.mobile`
        .chart__title {
            justify-content: space-between;
        }
    `}
`

const ComponentHeader = memo(({ chartClass, tags }) => {
    return (
        <Container>
            <Title>{chartClass}</Title>
            <div className="component_meta">
                {tags.map(tag => (
                    <span key={tag} className="component_meta_tag">
                        {tag}
                    </span>
                ))}
            </div>
        </Container>
    )
})

ComponentHeader.propTypes = {
    chartClass: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
}

ComponentHeader.defaultProps = {
    tags: [],
}

export default ComponentHeader
