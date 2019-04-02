/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './PieControls'
import { PieDefaultProps, ResponsivePieCanvas } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const DATASET_SIZE = 18
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const initialSettings = {
    margin: {
        top: 40,
        right: 200,
        bottom: 40,
        left: 80,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: true,

    colors: 'paired',
    colorBy: 'id',

    borderWidth: 0,
    borderColor: { type: 'inherit:darker', gamma: 0.6 },

    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: { type: 'custom', color: '#333333' },
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    radialLabelsLinkColor: { type: 'inherit' },

    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsSkipAngle: 10,
    slicesLabelsTextColor: { type: 'custom', color: '#333333' },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    theme: nivoTheme,
    'showcase pattern usage': true,

    defs: [],
    fill: [],

    legends: [
        {
            anchor: 'right',
            direction: 'column',
            translateX: 140,
            itemWidth: 60,
            itemHeight: 14,
            itemsSpacing: 2,
            symbolSize: 14,
            symbolShape: 'circle',
        },
    ],
}

const description = `
A variation around the [Pie](self:/pie) component. Well suited for
large data sets as it does not impact DOM tree depth, however you'll
lose the isomorphic ability and transitions.

The responsive alternative of this component is \`ResponsivePieCanvas\`.

See the [dedicated guide](self:/guides/legends) on how to setup
legends for this component.
`

const PieCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[arc] ${node.label}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode('ResponsivePieCanvas', mappedSettings, {
        pkg: '@nivo/pie',
        defaults: PieDefaultProps,
    })

    return (
        <ChartPage>
            <ChartHeader chartClass="PieCanvas" tags={['@nivo/pie', 'radial', 'canvas']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="pie" code={code} data={data} diceRoll={diceRoll}>
                <ResponsivePieCanvas data={data} {...mappedSettings} onClick={onClick} />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="PieCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.PieCanvas}
            />
        </ChartPage>
    )
}

export default PieCanvas
