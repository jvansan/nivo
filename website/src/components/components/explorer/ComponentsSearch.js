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
import SearchIcon from 'react-icons/lib/md/search'
import ClearIcon from 'react-icons/lib/md/close'

export default class ComponentsSearch extends Component {
    static propTypes = {
        term: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        style: PropTypes.object,
    }

    handleSearch = e => {
        const { onChange } = this.props
        onChange(e.target.value)
    }

    handleClear = () => {
        this.props.onChange('')
    }

    render() {
        const { term, style } = this.props

        return (
            <div className="ComponentsSearch" style={style}>
                <input
                    className="ComponentsSearch__input"
                    type="text"
                    onChange={this.handleSearch}
                    placeholder="Search"
                    value={term}
                />
                <SearchIcon className="ComponentsSearch__icon" />
                {term.length > 0 && (
                    <span className="ComponentsSearch__clear" onClick={this.handleClear}>
                        <ClearIcon className="ComponentsSearch__clear__icon" />
                    </span>
                )}
            </div>
        )
    }
}
