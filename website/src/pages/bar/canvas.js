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
import SEO from '../../components/seo'
import { useTheme } from '../../theming/context'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/bar/meta.yml'
import { generateHeavyDataSet } from '../../data/components/bar/generator'
import mapper from '../../data/components/bar/mapper'
import { groupsByScope } from '../../data/components/bar/props'

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

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

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
}

const BarCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateHeavyDataSet())
    const diceRoll = useCallback(() => setData(generateHeavyDataSet()), [setData])
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

    const mappedSettings = mapper(settings)

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
        <ComponentPage>
            <SEO title="BarCanvas" keywords={meta.BarCanvas.tags} />
            <ComponentHeader chartClass="BarCanvas" tags={meta.BarCanvas.tags} />
            <ComponentDescription description={meta.BarCanvas.description} />
            <ComponentTabs
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
                    theme={theme.nivo}
                    onClick={onClick}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <ComponentSettings
                component="BarCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.BarCanvas}
            />
        </ComponentPage>
    )
}

export default BarCanvas
