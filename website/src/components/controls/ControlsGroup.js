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

const renderControl = (groupName, config, settings, onChange) => {
    if (!shouldRenderControl(config, settings)) {
        return null
    }

    const id = `${snakeCase(groupName)}-${config.name}`
    const value = get(settings, config.name)
    const handleChange = onChange(config.name)

    switch (config.type) {
        case 'array':
            return (
                <ArrayControl
                    id={id}
                    value={value}
                    label={config.name}
                    help={config.help}
                    //onChange={this.handleArrayUpdate(config.name)}
                    onChange={handleChange}
                    props={getPropertiesGroupControls(config.props)}
                    shouldCreate={config.shouldCreate}
                    addLabel={config.addLabel}
                    shouldRemove={config.shouldRemove}
                    defaults={config.defaults}
                    getItemTitle={config.getItemTitle}
                />
            )

        case 'object':
            return (
                <ObjectControl
                    id={id}
                    value={value}
                    label={config.name}
                    help={config.help}
                    onChange={handleChange}
                    //onChange={this.handleArrayUpdate(config.name)}
                    props={getPropertiesGroupControls(config.props)}
                    defaults={config.defaults}
                />
            )

        case 'choices':
            return (
                <ChoicesControl
                    id={id}
                    value={value}
                    label={config.name}
                    help={config.help}
                    choices={config.choices}
                    onChange={handleChange}
                />
            )

        case 'radio':
            return (
                <RadioControl
                    id={id}
                    value={value}
                    label={config.name}
                    choices={config.choices}
                    onChange={handleChange}
                    help={config.help}
                />
            )

        case 'range':
            return (
                <RangeControl
                    id={id}
                    value={value}
                    {...pick(config, ['min', 'max', 'unit', 'step', 'help'])}
                    label={config.name}
                    onChange={handleChange}
                />
            )

        case 'switch':
            return (
                <SwitchControl
                    id={id}
                    value={value}
                    label={config.name}
                    onChange={handleChange}
                    help={config.help}
                />
            )

        case 'switchableRange':
            return (
                <SwitchableRangeControl
                    id={id}
                    value={value}
                    {...pick(config, [
                        'min',
                        'max',
                        'defaultValue',
                        'disabledValue',
                        'unit',
                        'step',
                        'help',
                    ])}
                    label={config.name}
                    onChange={handleChange}
                />
            )

        case 'text':
            return (
                <TextControl
                    id={id}
                    value={value}
                    label={config.name}
                    onChange={handleChange}
                    help={config.help}
                    disabled={config.disabled}
                />
            )

        case 'colors':
            return (
                <ColorsControl
                    id={id}
                    value={value}
                    label={config.name}
                    includeSequential={!!config.includeSequential}
                    onChange={handleChange}
                    help={config.help}
                />
            )

        case 'boxAnchor':
            return (
                <BoxAnchorControl
                    id={id}
                    value={value}
                    label={config.name}
                    onChange={handleChange}
                    help={config.help}
                />
            )

        case 'margin':
            return (
                <MarginControl
                    id={id}
                    value={value}
                    help={config.help}
                    label={config.name}
                    onChange={handleChange}
                />
            )

        case 'opacity':
            return (
                <OpacityControl
                    id={id}
                    value={value}
                    help={config.help}
                    label={config.name}
                    onChange={handleChange}
                />
            )

        case 'lineWidth':
            return (
                <LineWidthControl
                    id={id}
                    value={value}
                    help={config.help}
                    label={config.name}
                    onChange={handleChange}
                />
            )

        case 'numberArray':
            return (
                <NumberArrayControl
                    id={id}
                    value={value}
                    help={config.help}
                    label={config.name}
                    onChange={handleChange}
                    items={config.items}
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
                    onChange={handleChange}
                    help={config.help}
                />
            )

        case 'color':
            return (
                <ColorControl
                    id={id}
                    value={value}
                    label={config.name}
                    onChange={handleChange}
                    {...pick(config, [
                        'withTheme',
                        'withCustomColor',
                        'defaultCustomColor',
                        'help',
                    ])}
                />
            )

        case 'colorPicker':
            return (
                <ColorPickerControl
                    id={id}
                    value={value}
                    label={config.name}
                    help={config.help}
                    onChange={handleChange}
                />
            )

        default:
            return null
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
