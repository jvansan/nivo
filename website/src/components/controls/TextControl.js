/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Control from './Control'
import Label from './Label'
import TextInput from './TextInput'

const TextControl = memo(({ id, label, value, onChange, help, disabled }) => {
    const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

    return (
        <Control>
            <Label htmlFor={id}>{label}</Label>
            <TextInput
                id={id}
                type="text"
                className={classNames('control-text', {
                    '_is-disabled': disabled === true,
                })}
                value={value}
                onChange={handleUpdate}
                disabled={disabled === true}
            />
            <span />
            <div className="control-help">{help}</div>
        </Control>
    )
})

TextControl.displayName = 'TextControl'
TextControl.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    help: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
}

export default TextControl
