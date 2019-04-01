/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Markdown from './Markdown'

const Description = styled.div`
    padding: 0 30px;
    margin-bottom: 40px;

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

const ComponentDescription = memo(({ description }) => {
    return (
        <Description>
            <Markdown source={description} />
        </Description>
    )
})

ComponentDescription.displayName = 'ComponentDescription'
ComponentDescription.propTypes = {
    description: PropTypes.string.isRequired,
}

export default ComponentDescription
