/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveBarCanvas } from '@nivo/bar'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import { groupsByScope } from './BarControls'
import Settings from '../../Settings'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet as generateData } from './generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialSettings = {
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
}

const description = `
A variation around the [Bar](self:/bar) component. Well suited for
large data sets as it does not impact DOM tree depth and does not involve React
diffing stuff for children (not that useful when using canvas), however you'll
lose the isomorphic ability and transitions.

The responsive alternative of this component is \`ResponsiveBarCanvas\`.
`

const BarCanvas = () => {
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
        'ResponsiveBarCanvas',
        {
            keys: data.keys,
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        { pkg: '@nivo/bar' }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="BarCanvas" tags={['@nivo/bar', 'canvas']} />
            <ComponentDescription description={description} />
            <ChartTabs
                chartClass="bar"
                code={code}
                data={data.data}
                diceRoll={diceRoll}
                nodeCount={data.data.length * data.keys.length}
            >
                <ResponsiveBarCanvas
                    data={data.data}
                    keys={data.keys}
                    {...mappedSettings}
                    onClick={onClick}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="BarCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.BarCanvas}
            />
        </ChartPage>
    )
}

export default BarCanvas
