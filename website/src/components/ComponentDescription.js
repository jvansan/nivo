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
import Markdown from './Markdown'

const ComponentDescription = memo(({ description }) => {
    return (
        <div className="chart-description">
            <Markdown source={description} />
        </div>
    )
})

ComponentDescription.displayName = 'ComponentDescription'
ComponentDescription.propTypes = {
    description: PropTypes.string.isRequired,
}

export default ComponentDescription
