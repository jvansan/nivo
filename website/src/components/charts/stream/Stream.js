/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import { groupsByScope } from './StreamControls'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import defaultProps from './defaultProps'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

export default class Stream extends Component {
    state = {
        ...generateLightDataSet(),
        settings: {
            ...defaultProps,
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    onClick: d => {
                        alert(JSON.stringify(d, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ],
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateLightDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveStream',
            {
                keys,
                ...mappedSettings,
            },
            {
                pkg: '@nivo/stream',
                defaults: StreamDefaultProps,
            }
        )

        return (
            <ChartPage>
                <ChartHeader
                    chartClass="Stream"
                    tags={['@nivo/stream', 'stacked', 'svg', 'isomorphic']}
                />
                <div className="chart-description">
                    <p className="description">Stream chart.</p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>ResponsiveStream</code>.
                    </p>
                    <p className="description">
                        See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                        legends for this component.
                    </p>
                </div>
                <ChartTabs chartClass="stream" code={code} data={data} diceRoll={this.diceRoll}>
                    <ResponsiveStream
                        data={data}
                        keys={keys}
                        {...mappedSettings}
                        theme={nivoTheme}
                    />
                </ChartTabs>
                <Settings
                    component="Stream"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Stream}
                />
            </ChartPage>
        )
    }
}
