/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap'
import isFunction from 'lodash/isFunction'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './HeatMapControls'
import generateCode from '../../../lib/generateChartCode'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet } from './generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const initialSettings = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 100,
        left: 60,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    minValue: 'auto',
    maxValue: 'auto',
    forceSquare: false,
    sizeVariation: 0,
    padding: 0,
    colors: 'BrBG',

    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: true,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: true,

    cellShape: 'rect',
    cellOpacity: 1,
    cellBorderWidth: 0,
    cellBorderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },

    enableLabels: false,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.4,
    },

    animate: true,
    motionStiffness: 120,
    motionDamping: 9,

    isInteractive: true,
    hoverTarget: 'rowColumn',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.5,
}

const HeatMapCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateHeavyDataSet())
    const diceRoll = useCallback(() => setData(generateHeavyDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[cell] ${node.yKey}.${node.xKey}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveHeatMapCanvas',
        {
            keys: data.keys,
            ...mappedSettings,
            cellShape: isFunction(mappedSettings.cellShape)
                ? 'Custom(props) => (…)'
                : mappedSettings.cellShape,
        },
        { pkg: '@nivo/heatmap' }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="HeatMapCanvas" tags={['@nivo/heatmap', 'canvas']} />
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/heatmap">HeatMap</Link> component. Well suited
                    for large data sets as it does not impact DOM tree depth and does not involve
                    React diffing stuff (not that useful when using canvas), however you'll lose the
                    isomorphic ability and transitions (for now).
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveHeatMapCanvas</code>.
                </p>
            </div>
            <ChartTabs
                chartClass="heatmap"
                code={code}
                data={data.data}
                diceRoll={diceRoll}
                nodeCount={data.data.length * data.keys.length}
            >
                <ResponsiveHeatMapCanvas
                    data={data.data}
                    keys={data.keys}
                    {...mappedSettings}
                    onClick={onClick}
                    theme={nivoTheme}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="HeatMapCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.HeatMapCanvas}
            />
        </ChartPage>
    )
}

export default HeatMapCanvas
