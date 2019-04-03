import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Control from './Control'
import Label from './Label'
import PropertyHelp from './PropertyHelp'

const SwitchControl = memo(({ id, label, value, onChange, help, description }) => {
    const handleChange = useCallback(event => onChange(event.target.checked), [onChange])

    return (
        <Control>
            <Label htmlFor={id}>{label}</Label>
            <span className="control-switch">
                <input
                    className="cmn-toggle"
                    id={id}
                    type="checkbox"
                    checked={value}
                    onChange={handleChange}
                />
                <label htmlFor={id} />
            </span>
            <PropertyHelp help={help} description={description} />
        </Control>
    )
})

SwitchControl.displayName = 'SwitchControl'
SwitchControl.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    help: PropTypes.node.isRequired,
}

export default SwitchControl
