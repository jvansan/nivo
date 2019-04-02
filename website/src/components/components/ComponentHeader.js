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

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            padding: 0 20px;
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            padding: 0 20px;
        }
    }
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    width: 100%;

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        .chart__title {
            justify-content: space-between;
        }
    }

    @media only screen and (max-width: 760px) {
        .chart__title {
            justify-content: space-between;
        }
    }
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
