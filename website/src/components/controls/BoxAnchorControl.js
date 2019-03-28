/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import Label from './Label'

const boxWidth = 80
const boxHeight = 50
const boxPadding = 10
const pointRadius = 4
const outlineRadius = 8
const pointColor = '#999999'
const pointSelectedColor = 'red'

const anchors = [
    ['center', boxWidth / 2, boxHeight / 2],
    ['top-left', 0, 0],
    ['top', boxWidth / 2, 0],
    ['top-right', boxWidth, 0],
    ['right', boxWidth, boxHeight / 2],
    ['bottom-right', boxWidth, boxHeight],
    ['bottom', boxWidth / 2, boxHeight],
    ['bottom-left', 0, boxHeight],
    ['left', 0, boxHeight / 2],
]

const BoxAnchorControl = ({
    label,
    value,
    onChange,
}) => {
    return (
        <div className="chart-controls_item">
            <Label>{label}</Label>
            <div>
                <svg width={boxWidth + boxPadding * 2} height={boxHeight + boxPadding * 2} style={{ background: 'white' }}>
                    <g transform={`translate(${boxPadding},${boxPadding})`}>
                        <rect
                            fill="none"
                            stroke="#dddddd"
                            strokeWidth={2}
                            width={boxWidth}
                            height={boxHeight}
                        />
                        {anchors.map(anchor => {
                            const isSelected = value === anchor[0]

                            return (
                                <g key={anchor[0]} transform={`translate(${anchor[1]},${anchor[2]})`}>
                                    <circle
                                        fill={isSelected ? pointSelectedColor : pointColor}
                                        r={pointRadius}
                                    />
                                    {isSelected && (
                                        <circle
                                            fill="none"
                                            stroke="red"
                                            strokeWidth={2}
                                            r={outlineRadius}
                                        />
                                    )}
                                    <circle
                                        fill="rgba(0, 0, 0, .3)"
                                        fillOpacity={0}
                                        r={outlineRadius}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            onChange(anchor[0])
                                        }}
                                    />
                                </g>
                            )
                        })}
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default BoxAnchorControl

/*
export default class RadioControl extends Component {
    static propTypes = {
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

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    render() {
        const { label, value, onChange, choices, help } = this.props

        return (
            <div className="chart-controls_item">
                <span className="control_label">{label}</span>
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
                                onChange={onChange}
                            />
                            {choice.label}
                        </label>
                    ))}
                </div>
                <span/>
                <div className="control-help">{help}</div>
            </div>
        )
    }
}
*/
