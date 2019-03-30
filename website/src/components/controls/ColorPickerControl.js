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
import Label from './Label'

class ColorPickerControl extends Component {
    handleChange = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        const { id, value, label, help } = this.props

        return (
            <>
                <Label htmlFor={id}>{label}</Label>
                <div>
                    <input type="color" id={id} onChange={this.handleChange} value={value} />
                    &nbsp;&nbsp;&nbsp;
                    <code className="code code-string">{value}</code>
                </div>
                <span />
                <div className="control-help">{help}</div>
            </>
        )
    }
}

ColorPickerControl.propTypes = {
    label: PropTypes.string.isRequired,
    help: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

ColorPickerControl.defaultProps = {
    label: 'color',
    help: 'Color.',
}

export default ColorPickerControl
