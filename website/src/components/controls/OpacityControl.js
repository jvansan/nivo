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
import Control from './Control'
import Label from './Label'
import TextInput from './TextInput'

const size = 24

const Row = styled.div`
    display: grid;
    grid-template-columns: ${size}px auto 60px;
    grid-column-gap: 12px;
    align-items: center;
    max-width: 200px;
`

const OpacityControl = ({ id, label, value, onChange }) => {
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
                <svg width={size} height={size}>
                    <defs>
                        <pattern
                            id="opacityControlChecker"
                            width={8}
                            height={8}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect fill="black" width={4} height={4} />
                            <rect fill="black" x={4} y={4} width={4} height={4} />
                        </pattern>
                    </defs>
                    <rect fill="url(#opacityControlChecker)" width={size} height={size} />
                    <rect fill="#e25d47" width={size} height={size} fillOpacity={value} />
                </svg>
                <input
                    type="range"
                    value={value}
                    onChange={handleChange}
                    min={0}
                    max={1}
                    step={0.05}
                />
                <TextInput value={value} onChange={handleChange} />
            </Row>
        </Control>
    )
}

export default OpacityControl
