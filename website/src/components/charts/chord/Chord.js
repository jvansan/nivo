/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ResponsiveChord } from '@nivo/chord'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Settings from '../../Settings'
import { groupsByScope } from './ChordControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import nivoTheme from '../../../nivoTheme'
import { generateChordData } from '@nivo/generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const MATRIX_SIZE = 5

const description = `
Chord diagram, uses [d3-chord](https://github.com/d3/d3-chord),
see [this demo](https://observablehq.com/@d3/chord-diagram).

The responsive alternative of this component is \`ResponsiveChord\`.

This component is available in the \`@nivo/api\`,
see [sample](api:/samples/chord) or
[try it using the API client](self:/chord/api).

See the [dedicated guide](self:/guides/legends) on how to setup
legends for this component.
`

export default class Chord extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
        settings: {
            margin: {
                top: 60,
                right: 60,
                bottom: 90,
                left: 60,
            },

            padAngle: 0.02,
            innerRadiusRatio: 0.96,
            innerRadiusOffset: 0.02,

            arcOpacity: 1,
            arcBorderWidth: 1,
            arcBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            ribbonOpacity: 0.5,
            ribbonBorderWidth: 1,
            ribbonBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            enableLabel: true,
            label: 'id',
            labelOffset: 12,
            labelRotation: -90,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1,
            },

            colors: 'nivo',

            isInteractive: true,
            arcHoverOpacity: 1,
            arcHoverOthersOpacity: 0.25,
            ribbonHoverOpacity: 0.75,
            ribbonHoverOthersOpacity: 0.25,

            animate: true,
            motionStiffness: 90,
            motionDamping: 7,

            legends: [
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 70,
                    itemWidth: 80,
                    itemHeight: 14,
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
        this.setState({ ...generateChordData({ size: MATRIX_SIZE }) })
    }

    render() {
        const { settings, matrix, keys } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveChord',
            { keys, ...mappedSettings },
            {
                pkg: '@nivo/chord',
                dataKey: 'matrix',
            }
        )

        return (
            <ChartPage>
                <ChartHeader
                    chartClass="Chord"
                    tags={['@nivo/chord', 'relational', 'svg', 'isomorphic']}
                />
                <ComponentDescription description={description} />
                <ChartTabs chartClass="chord" code={code} data={matrix} diceRoll={this.diceRoll}>
                    <ResponsiveChord
                        matrix={matrix}
                        keys={keys}
                        {...mappedSettings}
                        theme={nivoTheme}
                    />
                </ChartTabs>
                <Settings
                    component="Chord"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Chord}
                />
            </ChartPage>
        )
    }
}
