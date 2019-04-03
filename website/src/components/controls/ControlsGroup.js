/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import set from 'lodash/set'
import isFunction from 'lodash/isFunction'
import merge from 'lodash/merge'
import snakeCase from 'lodash/snakeCase'
import pick from 'lodash/pick'
import { getPropertiesGroupControls } from '../../lib/componentProperties'
import ArrayControl from './ArrayControl'
import ObjectControl from './ObjectControl'
import SwitchControl from './SwitchControl'
import SwitchableRangeControl from './SwitchableRangeControl'
import ColorsControl from './ColorsControl'
import QuantizeColorsControl from './QuantizeColorsControl'
import ColorControl from './ColorControl'
import ColorPickerControl from './ColorPickerControl'
import TextControl from './TextControl'
import RadioControl from './RadioControl'
import RangeControl from './RangeControl'
import ChoicesControl from './ChoicesControl'
import BoxAnchorControl from './BoxAnchorControl'
import MarginControl from './MarginControl'
import OpacityControl from './OpacityControl'
import LineWidthControl from './LineWidthControl'
import NumberArrayControl from './NumberArrayControl'
import AngleControl from './AngleControl'
import PropertyDocumentation from './PropertyDocumentation'
// import AxisControl from './AxisControl'

export const shouldRenderControl = (config, context) => {
    if (!isFunction(config.when)) return true
    return config.when(context)
}

/*
handleArrayUpdate = key => value => {
    const { onChange, settings } = this.props
    onChange(set({ ...settings }, key, value))
}
*/

const renderControl = (groupName, property, settings, onChange) => {
    if (!shouldRenderControl(property, settings)) {
        return null
    }

    const id = `${snakeCase(groupName)}-${property.name}`
    const value = get(settings, property.name)
    const handleChange = onChange(property.name)
    const options = property.controlOptions || {}

    switch (property.controlType) {
        case 'array':
            return (
                <ArrayControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    props={getPropertiesGroupControls(options.props)}
                    shouldCreate={options.shouldCreate}
                    addLabel={options.addLabel}
                    shouldRemove={options.shouldRemove}
                    defaults={options.defaults}
                    getItemTitle={options.getItemTitle}
                    //onChange={this.handleArrayUpdate(config.name)}
                    onChange={handleChange}
                />
            )

        case 'object':
            return (
                <ObjectControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    props={getPropertiesGroupControls(options.props)}
                    defaults={options.defaults}
                    //onChange={this.handleArrayUpdate(config.name)}
                    onChange={handleChange}
                />
            )

        case 'choices':
            return (
                <ChoicesControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    choices={options.choices}
                    onChange={handleChange}
                />
            )

        case 'radio':
            return (
                <RadioControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    choices={options.choices}
                    onChange={handleChange}
                />
            )

        case 'range':
            return (
                <RangeControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    {...pick(options, ['min', 'max', 'unit', 'step'])}
                    onChange={handleChange}
                />
            )

        case 'switch':
            return (
                <SwitchControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'switchableRange':
            return (
                <SwitchableRangeControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    {...pick(options, [
                        'min',
                        'max',
                        'defaultValue',
                        'disabledValue',
                        'unit',
                        'step',
                    ])}
                    onChange={handleChange}
                />
            )

        case 'text':
            return (
                <TextControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    disabled={options.disabled}
                    onChange={handleChange}
                />
            )

        case 'colors':
            return (
                <ColorsControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    includeSequential={!!options.includeSequential}
                    onChange={handleChange}
                />
            )

        case 'boxAnchor':
            return (
                <BoxAnchorControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'margin':
            return (
                <MarginControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'opacity':
            return (
                <OpacityControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'lineWidth':
            return (
                <LineWidthControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'numberArray':
            return (
                <NumberArrayControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    items={options.items}
                    onChange={handleChange}
                />
            )

        /*
        case 'axis':
            return (
                <AxisControl
                    id={config.name}
                    label={config.name}
                    help={config.help}
                    value={get(settings, config.name)}
                    onChange={this.handleArrayUpdate(config.name)}
                />
            )
        */

        case 'quantizeColors':
            return (
                <QuantizeColorsControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'color':
            return (
                <ColorControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    {...pick(options, [
                        'withTheme',
                        'withCustomColor',
                        'defaultCustomColor',
                        'help',
                    ])}
                    onChange={handleChange}
                />
            )

        case 'colorPicker':
            return (
                <ColorPickerControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    onChange={handleChange}
                />
            )

        case 'angle':
            return (
                <AngleControl
                    id={id}
                    value={value}
                    label={property.name}
                    help={property.help}
                    description={property.description}
                    start={options.start}
                    min={options.min}
                    max={options.max}
                    onChange={handleChange}
                />
            )

        default:
            return (
                <PropertyDocumentation
                    name={property.name}
                    help={property.help}
                    description={property.description}
                />
            )
    }
}

const ControlsGroup = ({ name, controls, settings, onChange }) => {
    const setValue = key => value => {
        onChange(merge({}, settings, set({}, key, value)))
    }

    return (
        <Fragment>
            {controls.map(control => {
                return (
                    <Fragment key={control.name}>
                        {renderControl(name, control, settings, setValue)}
                    </Fragment>
                )
            })}
        </Fragment>
    )
}

ControlsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    controls: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ControlsGroup
