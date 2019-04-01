/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Control from './Control'
import Label from './Label'
import TextInput from './TextInput'

const Range = styled.input`
    max-width: 160px;
`

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
`

const NumberArrayControl = ({ label: globalLabel, id, value, onChange, unit, items, help }) => {
    const handleChange = useCallback(
        index => event => {
            const updatedArray = [...value]
            updatedArray[index] = Number(event.target.value)
            onChange(updatedArray)
        },
        [onChange, value]
    )

    return (
        <Control>
            <Label>{globalLabel}</Label>
            <div>
                [
                {value.map((v, i) => {
                    return (
                        <Fragment key={i}>
                            {i > 0 && <span>, </span>}
                            <span>{v}</span>
                        </Fragment>
                    )
                })}
                ]
            </div>
            {items.map(({ label, min, max, step }, i) => {
                const itemId = `${id}-${i}`

                return (
                    <Fragment key={itemId}>
                        <Label htmlFor={itemId}>{label}</Label>
                        <Row>
                            <TextInput
                                id={itemId}
                                value={value[i]}
                                isNumber={true}
                                unit={unit}
                                onChange={handleChange(i)}
                            />
                            <Range
                                type="range"
                                value={value[i]}
                                onChange={handleChange(i)}
                                min={min}
                                max={max}
                                step={step || 1}
                            />
                        </Row>
                    </Fragment>
                )
            })}
            <span />
            <div className="control-help">{help}</div>
        </Control>
    )
}

NumberArrayControl.propTypes = {
    label: PropTypes.string.isRequired,
    help: PropTypes.node.isRequired,
    unit: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            min: PropTypes.number.isRequired,
            max: PropTypes.number.isRequired,
            step: PropTypes.number,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default NumberArrayControl
