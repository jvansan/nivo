/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dedent from 'dedent-js'
import Markdown from '../Markdown'

const Help = styled.div`
    font-size: 12px;
    color: #777;
    margin: 0;
    line-height: 16px;
    grid-column-start: 2;
`

const PropertyHelp = ({ help, description }) => {
    return (
        <>
            <Help>{help}</Help>
            <span />
            {description && (
                <div>
                    <Markdown source={dedent(description)} />
                </div>
            )}
        </>
    )
}

PropertyHelp.propTypes = {
    help: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default PropertyHelp
