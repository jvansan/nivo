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

class ChartHeader extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const { chartClass, tags } = this.props

        return (
            <div className="chart_header">
                <h1 className="chart__title">{chartClass}</h1>
                <div className="component_meta">
                    {tags.map(tag => (
                        <span key={tag} className="component_meta_tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}

ChartHeader.propTypes = {
    chartClass: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
}

ChartHeader.defaultProps = {
    tags: [],
}

export default ChartHeader
