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
import { Link } from 'react-router-dom'
import { ResponsiveLine, LineDefaultProps } from '@nivo/line'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import { lineStories } from './stories'
import Settings from '../../Settings'
import { groupsByScope } from './LineControls'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import defaultProps from './defaultProps'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

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
                <div className="chart-description">
                    <p className="description">Line chart with stacking ability.</p>
                    <p>
                        Given an array of data series having an id and a nested array of points
                        (with x, y properties), it will compute the line for each data serie. All
                        datum having null x or y will be treated as holes, thus portions of the
                        corresponding line will be skipped.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is <code>ResponsiveLine</code>.
                    </p>
                    <p className="description">
                        This component is available in the{' '}
                        <a
                            href="https://github.com/plouc/nivo-api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo-api
                        </a>
                        , see{' '}
                        <a
                            href={`${config.nivoApiUrl}/samples/line.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/line/api">try it using the API client</Link>.
                    </p>
                    <p className="description">
                        See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                        legends for this component.
                    </p>
                </div>
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
