/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveScatterPlotCanvas, ScatterPlotDefaultProps } from '@nivo/scatterplot'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import scatterplot from '../../data/components/scatterplot/meta.yml'
import mapper from '../../data/components/scatterplot/mapper'
import { groupsByScope } from '../../data/components/scatterplot/props'
import { generateHeavyDataSet } from '../../data/components/scatterplot/generator'
// import nivoTheme from '../../../nivoTheme'

const initialSettings = {
    margin: {
        top: 60,
        right: 140,
        bottom: 70,
        left: 90,
    },

    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    colors: 'nivo',
    colorBy: 'serie.id',

    symbolSize: 4,
    symbolShape: 'circle',

    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 36,
        format: d => `${d} kg`,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
        legendPosition: 'middle',
        legendOffset: -40,
        format: d => `${d} cm`,
    },

    enableGridX: true,
    enableGridY: true,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    useMesh: true,
    debugMesh: false,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            symbolSize: 12,
            symbolShape: 'circle',
        },
    ],
}

const ScatterPlotCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateHeavyDataSet())
    const diceRoll = useCallback(() => setData(generateHeavyDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[point] serie: ${node.serie.id}, x: ${node.x}, y: ${node.y}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveScatterPlotCanvas',
        {
            ...mappedSettings,
        },
        { pkg: '@nivo/scatterplot', defaults: ScatterPlotDefaultProps }
    )

    return (
        <Layout>
            <ComponentPage>
                <ComponentHeader
                    chartClass="ScatterPlotCanvas"
                    tags={scatterplot.ScatterPlotCanvas.tags}
                />
                <ComponentDescription description={scatterplot.ScatterPlotCanvas.description} />
                <ComponentTabs
                    chartClass="scatterplot"
                    code={code}
                    data={data}
                    diceRoll={diceRoll}
                    nodeCount={data.length * data[0].data.length}
                >
                    <ResponsiveScatterPlotCanvas
                        data={data}
                        {...mappedSettings}
                        // theme={nivoTheme}
                        onClick={onClick}
                    />
                </ComponentTabs>
                <ActionsLogger actions={actions} />
                <ComponentSettings
                    component="ScatterPlotCanvas"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.ScatterPlotCanvas}
                />
                <Stories stories={scatterplot.ScatterPlotCanvas.stories} />
            </ComponentPage>
        </Layout>
    )
}

export default ScatterPlotCanvas
