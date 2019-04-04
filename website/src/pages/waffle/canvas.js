/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveWaffleCanvas, WaffleDefaultProps } from '@nivo/waffle'
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
import meta from '../../data/components/waffle/meta.yml'
import { groupsByScope } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const generateData = () => [
    {
        id: 'car',
        label: 'car',
        value: Math.random() * 20,
        color: '#eaafaf',
    },
    {
        id: 'walk',
        label: 'walk',
        value: Math.random() * 20,
        color: '#a2738c',
    },
    {
        id: 'scooter',
        label: 'scooter',
        value: Math.random() * 20,
        color: '#645c84',
    },
    {
        id: 'bicycle',
        label: 'bicycle',
        value: Math.random() * 20,
        color: '#427996',
    },
    {
        id: 'e-bicycle',
        label: 'e-bicycle',
        value: Math.random() * 20,
        color: '#42291c',
    },
    {
        id: 'moto',
        label: 'moto',
        value: Math.random() * 20,
        color: '#3f5468',
    },
    {
        id: 'other',
        label: 'other',
        value: Math.random() * 20,
        color: '#b8e4c9',
    },
]

const initialSettings = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    total: 140,

    rows: 40,
    columns: 40,
    fillDirection: 'bottom',
    padding: 0.5,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'category10',
    colorBy: 'id',
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb',
                    },
                },
            ],
        },
    ],
}

const WaffleCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            let label
            if (node.data && node.data.value !== undefined) {
                label = `${node.data.label}: ${node.data.value} (position: ${node.position})`
            } else {
                label = `empty at position: ${node.position}`
            }
            logAction({
                type: 'click',
                label: `[cell] ${label}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveWaffleCanvas',
        {
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
        },
        {
            pkg: '@nivo/waffle',
            defaults: WaffleDefaultProps,
        }
    )

    return (
        <ComponentPage>
            <SEO title="WaffleCanvas" keywords={meta.WaffleCanvas.tags} />
            <ComponentHeader chartClass="WaffleCanvas" tags={meta.WaffleCanvas.tags} />
            <ComponentDescription description={meta.WaffleCanvas.description} />
            <ComponentTabs
                chartClass="waffle"
                code={code}
                data={data}
                diceRoll={diceRoll}
                nodeCount={settings.rows * settings.columns}
            >
                <ResponsiveWaffleCanvas
                    data={data}
                    {...mappedSettings}
                    onClick={onClick}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <ComponentSettings
                component="WaffleCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.WaffleCanvas}
            />
        </ComponentPage>
    )
}

export default WaffleCanvas
