import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Control from './Control'
import Select from './Select'
import Label from './Label'

const ChoicesControl = memo(({ id, label, value: _value, choices, onChange, help }) => {
    const handleUpdate = useCallback(value => onChange(value.value), [onChange])
    const value = choices.find(({ value: v }) => v === _value)

    return (
        <Control>
            <Label htmlFor={id}>{label}</Label>
            <Select options={choices} value={value} clearable={false} onChange={handleUpdate} />
            <span />
            <div className="control-help">{help}</div>
        </Control>
    )
})

ChoicesControl.displayName = 'ChoicesControl'
ChoicesControl.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    help: PropTypes.node.isRequired,
}

export default ChoicesControl
