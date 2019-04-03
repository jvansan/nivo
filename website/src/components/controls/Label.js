import React, { Component } from 'react'
import styled from 'styled-components'

const LabelElement = styled.label`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-self: center;
    text-align: right;
    margin: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`

export default class Label extends Component {
    render() {
        const { children, ...rest } = this.props

        return <LabelElement {...rest}>{children}</LabelElement>
    }
}
