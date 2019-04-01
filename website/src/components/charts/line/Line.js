/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import omit from 'lodash/omit'
import { ResponsiveLine, LineDefaultProps } from '@nivo/line'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import Stories from '../../Stories'
import { lineStories } from './stories'
import Settings from '../../Settings'
import { groupsByScope } from './LineControls'
import nivoTheme from '../../../nivoTheme'
import defaultProps from './defaultProps'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const description = `
Line chart with stacking ability.

Given an array of data series having an id and a nested array of points
(with x, y properties), it will compute the line for each data serie.
All datum having null x or y will be treated as holes, thus portions
of the corresponding line will be skipped.

The responsive alternative of this component is \`ResponsiveLine\`.

This component is available in the \`@nivo/api\`, see
[sample](api:/samples/line.svg) or
[try it using the API client](self:/line/api).

See the [dedicated guide](self:/guides/legends) on how to setup
legends for this component.
`

export default class Line extends Component {
    state = {
        settings: {
            ...omit(defaultProps, ['width', 'height']),
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    onClick: data => {
                        alert(JSON.stringify(data, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
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
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveLine', mappedSettings, {
            pkg: '@nivo/line',
            defaults: LineDefaultProps,
        })

        return (
            <ChartPage>
                <ChartHeader chartClass="Line" tags={['@nivo/line', 'svg', 'isomorphic']} />
                <ComponentDescription description={description} />
                <ChartTabs chartClass="line" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveLine data={data} {...mappedSettings} theme={nivoTheme} />
                </ChartTabs>
                <Settings
                    component="Line"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Line}
                />
                <Stories stories={lineStories} isFullWidth={true} />
            </ChartPage>
        )
    }
}
