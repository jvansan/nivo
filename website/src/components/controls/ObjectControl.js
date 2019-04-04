/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlsGroup from './ControlsGroup'
import PropertyHeader from './PropertyHeader'
import { Cell, Toggle, Help } from './styled'

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accentLight};
`

const Header = styled(Cell)`
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};

        ${Title} {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    ${Title} {
        ${({ isOpened, theme }) => (isOpened ? `color: ${theme.colors.accent};` : '')}
    }
`

export default class ObjectControl extends PureComponent {
    static propTypes = {
        property: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.object.isRequired,
        props: PropTypes.array.isRequired,
    }

    static defaultProps = {
        defaults: {},
    }

    state = {
        isOpened: true,
    }

    handleToggle = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        })
    }

    render() {
        const { property, value, props, onChange } = this.props
        const { isOpened } = this.state

        return (
            <Fragment>
                <Header isOpened={isOpened} onClick={this.handleToggle}>
                    <PropertyHeader {...property} />
                    <Help>{property.help}</Help>
                    <Toggle isOpened={isOpened} />
                </Header>
                {isOpened && (
                    <ControlsGroup
                        name={property.key}
                        controls={props}
                        settings={value}
                        onChange={onChange}
                        isNested={true}
                    />
                )}
            </Fragment>
        )
    }
}
