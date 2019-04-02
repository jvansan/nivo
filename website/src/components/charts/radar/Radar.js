/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveRadar } from '@nivo/radar'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Settings from '../../Settings'
import { groupsByScope } from './RadarControls'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import ComponentDescription from '../../ComponentDescription'
import { radarStories } from './stories'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const description = `
Generates a radar chart from an array of data.
Note that margin object does not take grid labels into account,
so you should adjust it to leave enough room for it.

The responsive alternative of this component is
\`ResponsiveRadar\`.

This component is available in the \`@nivo/api\`, see
[sample](api:/samples/radar.svg) or
[try it using the API client](self:/radar/api).

See the [dedicated guide](self:/guides/legends) on how to setup
legends for this component.
`

export default class Radar extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        indexBy: PropTypes.string.isRequired,
    }

    state = {
        settings: {
            maxValue: 'auto',

            margin: {
                top: 70,
                right: 80,
                bottom: 40,
                left: 80,
            },

            curve: 'catmullRomClosed',

            // border
            borderWidth: 2,
            borderColor: { type: 'inherit' },

            // axes & grid
            gridLevels: 5,
            gridShape: 'circular',
            gridLabelOffset: 36,

            // dots
            enableDots: true,
            dotSize: 8,
            dotColor: { type: 'inherit' },
            dotBorderWidth: 0,
            dotBorderColor: { type: 'custom', color: '#ffffff' },
            enableDotLabel: true,
            dotLabel: 'value',
            dotLabelYOffset: -12,

            colors: 'nivo',
            colorBy: 'key',
            fillOpacity: 0.1,

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,

            legends: [
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
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

    render() {
        const { data, keys, indexBy, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveRadar',
            {
                keys,
                indexBy,
                ...mappedSettings,
            },
            { pkg: '@nivo/radar' }
        )

        return (
            <ChartPage>
                <ChartHeader
                    chartClass="Radar"
                    tags={['@nivo/radar', 'radial', 'svg', 'isomorphic']}
                />
                <ComponentDescription description={description} />
                <ChartTabs chartClass="radar" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveRadar
                        data={data}
                        keys={keys}
                        indexBy={indexBy}
                        {...mappedSettings}
                        theme={nivoTheme}
                    />
                </ChartTabs>
                <Settings
                    component="Radar"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Radar}
                />
                <Stories isFullWidth={true} stories={radarStories} />
            </ChartPage>
        )
    }
}
