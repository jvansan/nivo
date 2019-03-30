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
import ControlsGroup from './controls/ControlsGroup'

const Container = styled.div`
    // position: fixed;
    // top: ${({ theme }) => theme.headerHeight}px;
    // bottom: 0;
    // left: 0;
    // width: 280px;
    // z-index: 1000;
    // overflow-x: hidden;
    // overflow-y: auto;
    // border-right: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-size: 13px;
    // line-height: 1.4em;
    margin-bottom: 40px;
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

export default class Settings extends Component {
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
