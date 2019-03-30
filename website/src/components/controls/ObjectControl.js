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
import ChartControls from './ChartControls'

const Header = styled.div`
    grid-column: span 3;
    padding: 9px 20px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--accent-color);
    user-select: none;
    opacity: ${({ isOpened }) => (isOpened ? 1 : 0.7)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:hover {
        color: var(--accent-color-darker);
    }

    &:last-child {
        border-bottom-width: 0;
    }
`

export default class ObjectControl extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        help: PropTypes.node.isRequired,
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
        const { label, help, value, props, onChange } = this.props
        const { isOpened } = this.state

        return (
            <Fragment>
                <Header isOpened={isOpened} onClick={this.handleToggle}>
                    <div>
                        {label}
                        <div className="control-help">{help}</div>
                    </div>
                </Header>
                {isOpened && (
                    <ChartControls
                        name={label}
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
