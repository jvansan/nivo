/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlsGroup from '../controls/ControlsGroup'

const Container = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const Group = styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    &:first-child {
        border-top-width: 0;
    }
`

const Title = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 16px 20px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1em;
    color: #e25d47;
`

export default class ComponentSettings extends Component {
    static propTypes = {
        component: PropTypes.string.isRequired,
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
    }

    render() {
        const { component, settings, onChange, groups } = this.props

        return (
            <Container>
                {groups.map(group => {
                    return (
                        <Group key={group.name}>
                            <Title>{group.name}</Title>
                            <ControlsGroup
                                component={component}
                                name={group.name}
                                controls={group.properties}
                                settings={settings}
                                onChange={onChange}
                            />
                        </Group>
                    )
                })}
            </Container>
        )
    }
}
