import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Control from './Control'
import TextInput from './TextInput'
import Label from './Label'
import PropertyHelp from './PropertyHelp'

export default class MarginControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.string.isRequired,
    }

    state = {
        side: null,
    }

    handleChange = side => e => {
        const { onChange, value } = this.props
        onChange({
            ...value,
            [side]: Number(e.target.value),
        })
    }

    handleFocus = side => () => {
        this.setState({ side })
    }

    handleBlur = () => {
        this.setState({ side: null })
    }

    render() {
        const { label, value, help, description } = this.props
        const { side } = this.state

        return (
            <Control>
                <Label>{label}</Label>
                <div className="MarginControl">
                    <span />
                    <TextInput
                        value={value.top}
                        unit="px"
                        onChange={this.handleChange('top')}
                        onFocus={this.handleFocus('top')}
                        onBlur={this.handleBlur}
                    />
                    <span />
                    <TextInput
                        value={value.left}
                        unit="px"
                        onChange={this.handleChange('left')}
                        onFocus={this.handleFocus('left')}
                        onBlur={this.handleBlur}
                    />
                    <span className={`MarginControl_Box${side !== null ? ` _${side}` : ''}`} />
                    <TextInput
                        value={value.right}
                        unit="px"
                        onChange={this.handleChange('right')}
                        onFocus={this.handleFocus('right')}
                        onBlur={this.handleBlur}
                    />
                    <span />
                    <TextInput
                        value={value.bottom}
                        unit="px"
                        onChange={this.handleChange('bottom')}
                        onFocus={this.handleFocus('bottom')}
                        onBlur={this.handleBlur}
                    />
                    <span />
                </div>
                <PropertyHelp help={help} description={description} />
            </Control>
        )
    }
}
