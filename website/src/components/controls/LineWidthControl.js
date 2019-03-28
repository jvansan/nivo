/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import styled from 'styled-components'
import Label from './Label'
import TextInput from './TextInput'

const size = 24

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto ${size}px;
    grid-column-gap: 12px;
    align-items: center;
    max-width: 240px;
`

const LineWidthControl = ({
    id,
    label,
    value,
    onChange
}) => {
    const handleChange = useCallback(
        (event) => {
            onChange(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <div className="chart-controls_item">
            <Label className="control_label" htmlFor={id}>
                {label}
            </Label>
            <Row>
                <TextInput
                    value={value}
                    onChange={handleChange}
                    unit="px"
                />
                <input
                    type="range"
                    value={value}
                    onChange={handleChange}
                    min={0}
                    max={20}
                />
                <svg
                    width={size}
                    height={size}
                >
                    <line
                        x1={size / 2}
                        y1={0}
                        x2={size / 2}
                        y2={size}
                        stroke="#999999"
                        strokeWidth={1}
                        fill="none"
                    />
                    <line
                        x1={size / 2}
                        y1={size * .2}
                        x2={size / 2}
                        y2={size * .8}
                        stroke="#000000"
                        strokeWidth={value}
                        fill="none"
                    />
                </svg>
            </Row>
        </div>
    )
}

export default LineWidthControl
