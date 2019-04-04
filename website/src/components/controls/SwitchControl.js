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
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import PropertyHelp from './PropertyHelp'

const SwitchControl = memo(({ id, property, value, onChange }) => {
    const handleChange = useCallback(event => onChange(event.target.checked), [onChange])

    return (
        <Control description={property.description}>
            <PropertyHeader id={id} {...property} />
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
            &nbsp;&nbsp;&nbsp;
            <PropertyHelp>{property.help}</PropertyHelp>
        </Control>
    )
})

SwitchControl.displayName = 'SwitchControl'
SwitchControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SwitchControl
