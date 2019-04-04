/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { PieDefaultProps, ResponsivePieCanvas } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
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
import meta from '../../data/components/pie/meta.yml'
import mapper from '../../data/components/pie/mapper'
import { groupsByScope } from '../../data/components/pie/props'

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

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

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

const PieCanvas = () => {
    const theme = useTheme()
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

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsivePieCanvas', mappedSettings, {
        pkg: '@nivo/pie',
        defaults: PieDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="PieCanvas" keywords={meta.PieCanvas.tags} />
            <ComponentHeader chartClass="PieCanvas" tags={meta.PieCanvas.tags} />
            <ComponentDescription description={meta.PieCanvas.description} />
            <ComponentTabs chartClass="pie" code={code} data={data} diceRoll={diceRoll}>
                <ResponsivePieCanvas
                    data={data}
                    {...mappedSettings}
                    onClick={onClick}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <ComponentSettings
                component="PieCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.PieCanvas}
            />
        </ComponentPage>
    )
}

export default PieCanvas
