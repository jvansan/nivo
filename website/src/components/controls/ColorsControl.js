/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import { colorSchemeIds, colorSchemes, colorInterpolatorIds, colorInterpolators } from '@nivo/core'
import { components } from 'react-select'
import ColorsControlItem from './ColorsControlItem'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import PropertyHelp from './PropertyHelp'
import Select from './Select'

const colors = colorSchemeIds.map(id => ({
    id,
    colors: colorSchemes[id],
}))

const sequentialColors = colorInterpolatorIds.map(id => ({
    id: `seq:${id}`,
    colors: range(0, 1, 0.05).map(t => colorInterpolators[id](t)),
}))

const SingleValue = props => {
    //console.log(props)

    return (
        <components.SingleValue {...props}>
            <div>CRAP</div>
        </components.SingleValue>
    )
}

const Option = props => {
    return (
        <components.Option {...props}>
            <ColorsControlItem id={props.value} colors={props.data.colors} />
        </components.Option>
    )
}

export default class ColorsControl extends PureComponent {
    static propTypes = {
        property: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        options: PropTypes.shape({
            includeSequential: PropTypes.bool,
        }).isRequired,
    }

    static defaultProps = {
        options: {},
    }

    handleColorsChange = value => {
        const { onChange } = this.props
        onChange(value.value)
    }

    renderValue(value) {
        return (
            <div className="colors_item colors_item-current">
                <div className="colors_item_colors">
                    {value.colors.map(color => (
                        <span
                            key={color}
                            className="colors_item_colors_item"
                            style={{ background: color }}
                        />
                    ))}
                </div>
            </div>
        )
    }

    render() {
        const { property, value, includeSequential } = this.props

        let options = colors
        if (includeSequential === true) {
            options = options.concat(sequentialColors)
        }

        /*
        console.log({
            value,
            options: options.map(({ id, colors }) => ({
                label: id,
                value: id,
                colors,
            })),
        })
        */

        return (
            <Control description={property.description}>
                <PropertyHeader {...property} />
                <Select
                    options={options.map(({ id, colors }) => ({
                        label: id,
                        value: id,
                        colors,
                    }))}
                    onChange={this.handleColorsChange}
                    value={value}
                    isSearchable
                    components={{
                        SingleValue,
                        Option,
                    }}
                />
                <PropertyHelp>{property.help}</PropertyHelp>
            </Control>
        )
    }
}
