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
import Label from './Label'

const RadioControl = memo(({ label, value, onChange, choices, help }) => {
    const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

    return (
        <Control>
            <Label>{label}</Label>
            <div className="control-radio">
                {choices.map(choice => (
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
            <span />
            <div className="control-help">{help}</div>
        </Control>
    )
})

RadioControl.displayName = 'RadioControl'
RadioControl.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    help: PropTypes.node.isRequired,
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default RadioControl
