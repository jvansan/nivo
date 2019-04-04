/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import PropertyHelp from './PropertyHelp'

const RadioControl = memo(({ property, options, value, onChange }) => {
    const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

    return (
        <Control description={property.description}>
            <PropertyHeader {...property} />
            <div className="control-radio">
                {options.choices.map(choice => (
                    <label
                        className={className('control-radio-item', {
                            '_is-active': value === choice.value,
                        })}
                        key={choice.value}
                    >
                        <input
                            type="radio"
                            value={choice.value}
                            checked={value === choice.value}
                            onChange={handleUpdate}
                        />
                        {choice.label}
                    </label>
                ))}
            </div>
            <PropertyHelp>{property.help}</PropertyHelp>
        </Control>
    )
})

RadioControl.displayName = 'RadioControl'
RadioControl.propTypes = {
    property: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.shape({
        choices: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default RadioControl
