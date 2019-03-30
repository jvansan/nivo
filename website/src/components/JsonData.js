/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import CollapsibleCard from './CollapsibleCard'

export default class JsonData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: JSON.stringify(props.data, null, '    '),
        }
    }

    /*
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data === this.props.data && nextState.show === this.state.show) {
            return false;
        }

        return true;
    }
    */

    handleDataUpdate = e => {
        const { onDataUpdate } = this.props
        if (onDataUpdate) {
            onDataUpdate(JSON.parse(e.target.value))
        }
        this.setState({ value: e.target.value })
    }

    render() {
        const { value } = this.state

        return (
            <CollapsibleCard title="Data">
                <div className="json-data_json">
                    <textarea onChange={this.handleDataUpdate} value={value} />
                </div>
            </CollapsibleCard>
        )
    }
}
