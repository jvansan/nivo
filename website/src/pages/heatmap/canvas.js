/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap'
import isFunction from 'lodash/isFunction'
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groupsByScope } from '../../data/components/heatmap/props'
import { generateHeavyDataSet } from '../../data/components/heatmap/generator'

const initialSettings = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 100,
        left: 60,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

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
    const theme = useTheme()
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

    const mappedSettings = mapper(settings)

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
        <ComponentPage>
            <SEO title="HeatMapCanvas" keywords={meta.HeatMapCanvas.tags} />
            <ComponentHeader chartClass="HeatMapCanvas" tags={meta.HeatMapCanvas.tags} />
            <ComponentDescription description={meta.HeatMapCanvas.description} />
            <ComponentTabs
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
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <ComponentSettings
                component="HeatMapCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.HeatMapCanvas}
            />
        </ComponentPage>
    )
}

export default HeatMapCanvas
