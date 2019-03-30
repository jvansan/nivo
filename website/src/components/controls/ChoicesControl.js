import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from './Select'
import Label from './Label'

export default class ChoicesControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    render() {
        const { id, label, value: _value, choices, onChange, help } = this.props

        const value = choices.find(({ value: v }) => v === _value)

        return (
            <div className="chart-controls_item">
                <Label htmlFor={id}>{label}</Label>
                <Select options={choices} value={value} clearable={false} onChange={onChange} />
                <span />
                <div className="control-help">{help}</div>
            </div>
        )
    }
}
