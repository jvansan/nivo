/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import ComponentDescription from '../../ComponentDescription'
import { groupsByScope } from './StreamControls'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import defaultProps from './defaultProps'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const description = `
Stream chart.

The responsive alternative of this component is
\`ResponsiveStream\`.

See the [dedicated guide](self:/guides/legends) on
how to setup legends for this component.
`

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
                    itemTextColor: '#999999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    onClick: d => {
                        alert(JSON.stringify(d, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000000',
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
                <ComponentDescription description={description} />
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
