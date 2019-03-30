/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveBar, BarDefaultProps } from '@nivo/bar'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import Settings from '../../Settings'
import ComponentDescription from '../../ComponentDescription'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import { groupsByScope } from './BarControls'
import { barStories } from './stories'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet as generateData } from './generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const Tooltip = () => {
    /* return custom tooltip */
}

const initialSettings = {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
    },

    padding: 0.3,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    colors: 'nivo',
    colorBy: 'id',
    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        }),
        patternLinesDef('lines', {
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        }),
    ],
    fill: [{ match: { id: 'fries' }, id: 'dots' }, { match: { id: 'sandwich' }, id: 'lines' }],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 1.6,
    },

    axisTop: {
        enable: false,
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
        legendOffset: 32,
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

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],

    theme: nivoTheme,
}

const description = `
Bar chart which can display multiple data series, stacked or side by side. Also
supports both vertical and horizontal layout, with negative values descending
below the x axis (or y axis if using horizontal layout).

The bar item component can be customized to render any valid SVG element, it
will receive current bar style, data and event handlers,
the storybook offers an [example](storybook:bar/custom-bar-item).

The responsive alternative of this component is \`ResponsiveBar\`.

This component is available in the [nivo-api](https://github.com/plouc/nivo-api),
see [sample](https://nivo-api.herokuapp.com/samples/bar.svg)
or [try it using the API client](self:/bar/api).

See the [dedicated guide](self:/guides/legends) on how to setup
legends for this component.
However it requires an extra property for each legend configuration you pass to
\`legends\` property: \`dataFrom\`, it defines how to compute
legend's data and accept \`indexes\` or \`keys\`.
\`indexes\` is suitable for simple bar chart with a single data serie
while \`keys\` may be used if you have several ones (groups).
`

const Bar = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[bar] ${node.id} - ${node.indexValue}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveBar',
        {
            keys: data.keys,
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        { pkg: '@nivo/bar', defaults: BarDefaultProps }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="Bar" tags={['@nivo/bar', 'svg', 'isomorphic']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="bar" code={code} data={data.data} diceRoll={diceRoll}>
                <ResponsiveBar
                    data={data.data}
                    keys={data.keys}
                    {...mappedSettings}
                    onClick={onClick}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} />
            <Settings
                component="Bar"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Bar}
            />
            <Stories stories={barStories} />
        </ChartPage>
    )
}

export default Bar
