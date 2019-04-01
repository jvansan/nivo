/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Control from './Control'
import Label from './Label'
import TextInput from './TextInput'

const size = 36
const center = size / 2
const markerSize = 6

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px ${size}px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
`

const Circle = styled.circle`
    fill: ${({ theme }) => theme.colors.cardAltBackground};
    strokewidth: 1px;
    stroke: ${({ theme }) => theme.colors.border};
`

const Marker = styled.circle`
    fill: ${({ theme }) => theme.colors.accent};
`

const AngleControl = ({ id, label, value, start = 0, min = 0, max = 360, onChange, help }) => {
    const handleChange = useCallback(
        event => {
            onChange(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <Control>
            <Label htmlFor={id}>{label}</Label>
            <Row>
                <TextInput id={id} value={value} onChange={handleChange} unit="°" isNumber={true} />
                <svg width={size} height={size}>
                    <Circle cx={center} cy={center} r={center - markerSize / 2} />
                    <g transform={`translate(${center},${center})`}>
                        <g transform={`rotate(${start + value})`}>
                            <line stroke="red" y2={-size / 2 + markerSize / 2} />
                            <Marker r={markerSize / 4} />
                            <Marker cy={-size / 2 + markerSize / 2} r={markerSize / 2} />
                        </g>
                    </g>
                </svg>
                <input type="range" value={value} onChange={handleChange} min={min} max={max} />
            </Row>
            <span />
            <div className="control-help">{help}</div>
        </Control>
    )
}

AngleControl.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    start: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    help: PropTypes.node.isRequired,
}

export default AngleControl
