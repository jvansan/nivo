/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveHeatMap, HeatMapDefaultProps } from '@nivo/heatmap'
import { patternLinesDef } from '@nivo/core'
import isFunction from 'lodash/isFunction'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import heatmap from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groupsByScope } from '../../data/components/heatmap/props'
import { generateLightDataSet } from '../../data/components/heatmap/generator'
// import nivoTheme from '../../../nivoTheme'

const initialSettings = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 60,
        left: 60,
    },

    minValue: 'auto',
    maxValue: 'auto',
    forceSquare: true,
    sizeVariation: 0,
    padding: 0,
    colors: 'nivo',

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
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 0,
    },
    axisBottom: {
        enable: false,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
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
    enableGridY: false,

    cellShape: 'rect',
    cellOpacity: 1,
    cellBorderWidth: 0,
    cellBorderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },

    enableLabels: true,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.8,
    },

    defs: [
        patternLinesDef('lines', {
            background: 'inherit',
            color: 'rgba(0, 0, 0, 0.1)',
            rotation: -45,
            lineWidth: 4,
            spacing: 7,
        }),
    ],
    fill: [{ match: d => false && d.value < 30, id: 'lines' }],

    animate: true,
    motionStiffness: 80,
    motionDamping: 9,

    isInteractive: true,
    hoverTarget: 'cell',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.25,
}

const HeatMap = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])
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
        'ResponsiveHeatMap',
        {
            keys: data.keys,
            ...mappedSettings,
            cellShape: isFunction(mappedSettings.cellShape)
                ? 'Custom(props) => (…)'
                : mappedSettings.cellShape,
        },
        { pkg: '@nivo/heatmap', defaults: HeatMapDefaultProps }
    )

    return (
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="HeatMap" tags={heatmap.HeatMap.tags} />
                <ComponentDescription description={heatmap.HeatMap.description} />
                <ComponentTabs
                    chartClass="heatmap"
                    code={code}
                    data={data.data}
                    diceRoll={diceRoll}
                >
                    <ResponsiveHeatMap
                        data={data.data}
                        keys={data.keys}
                        {...mappedSettings}
                        onClick={onClick}
                        //theme={nivoTheme}
                    />
                </ComponentTabs>
                <ActionsLogger actions={actions} />
                <ComponentSettings
                    component="HeatMap"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.HeatMap}
                />
                <Stories stories={heatmap.HeatMap.stories} />
            </ComponentPage>
        </Layout>
    )
}

export default HeatMap
