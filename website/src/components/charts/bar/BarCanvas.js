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
import { ResponsiveBarCanvas } from '@nivo/bar'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import { groupsByScope } from './BarControls'
import Settings from '../../Settings'
import generateCode from '../../../lib/generateChartCode'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet as generateData } from './generators'
import propsMapper from './propsMapper'

const Tooltip = data => {
    /* return custom tooltip */
}

export default class BarCanvas extends Component {
    state = {
        ...generateData(),
        settings: {
            indexBy: 'country',

            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            padding: 0.15,
            innerPadding: 0,
            minValue: 'auto',
            maxValue: 'auto',

            groupMode: 'stacked',
            layout: 'horizontal',
            reverse: false,

            colors: 'paired',
            colorBy: 'id',
            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 1.6,
            },

            axisTop: {
                enable: true,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            },
            axisRight: {
                enable: false,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 0,
            },
            axisBottom: {
                enable: true,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 36,
            },
            axisLeft: {
                enable: true,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
            },

            enableGridX: false,
            enableGridY: true,

            enableLabel: true,
            labelSkipWidth: 12,
            labelSkipHeight: 12,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1.6,
            },

            isInteractive: true,
            'custom tooltip example': false,
            tooltip: null,

            theme: nivoTheme,
        },
    }

    diceRoll = () => {
        this.setState(generateData())
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(`${node.id}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveBarCanvas',
            {
                keys,
                ...mappedSettings,
                tooltip: mappedSettings.tooltip ? Tooltip : undefined,
            },
            { pkg: '@nivo/bar' }
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/bar">Bar</Link> component. Well suited for
                    large data sets as it does not impact DOM tree depth and does not involve React
                    diffing stuff for children (not that useful when using canvas), however you'll
                    lose the isomorphic ability and transitions.
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveBarCanvas</code>
                    .
                </p>
            </div>
        )

        return (
            <div className="chart_page">
                <ChartHeader chartClass="BarCanvas" tags={['@nivo/bar', 'canvas']} />
                {description}
                <ChartTabs
                    chartClass="bar"
                    code={code}
                    data={data}
                    diceRoll={this.diceRoll}
                    nodeCount={data.length * keys.length}
                >
                    <ResponsiveBarCanvas
                        data={data}
                        keys={keys}
                        {...mappedSettings}
                        onClick={this.handleNodeClick}
                    />
                </ChartTabs>
                <Settings
                    component="BarCanvas"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.BarCanvas}
                />
            </div>
        )
    }
}
