/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Control from './Control'
import Label from './Label'
// import TextInput from './TextInput'

const Items = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 9px;
`

const NumberArrayControl = ({ label: globalLabel, items }) => {
    return (
        <Control>
            <Label>{globalLabel}</Label>
            <Items>
                {items.map(({ label }, i) => {
                    return <div key={i}>{label}</div>
                })}
            </Items>
        </Control>
    )
}

NumberArrayControl.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
        })
    ).isRequired,
}

export default NumberArrayControl
