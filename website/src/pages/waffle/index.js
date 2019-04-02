/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveWaffle, WaffleDefaultProps } from '@nivo/waffle'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import waffle from '../../data/components/waffle/meta.yml'
import { groupsByScope } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'
//import nivoTheme from '../../../nivoTheme'

const generateData = () => [
    {
        id: 'men',
        label: 'men',
        value: Math.random() * 33,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: Math.random() * 33,
        color: '#ba72ff',
    },
    {
        id: 'children',
        label: 'children',
        value: Math.random() * 33,
        color: '#a1cfff',
    },
]

const initialSettings = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: 'bottom',
    padding: 1,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    cellComponent: 'default',
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'nivo',
    colorBy: 'id',
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

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

    // theme: nivoTheme,
}

const Waffle = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            let label
            if (node.data.value !== undefined) {
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

    const mappedSettings = mapper(settings, { component: 'Waffle' })

    const code = generateCode(
        'ResponsiveWaffle',
        {
            ...mappedSettings,
            cellComponent: mappedSettings.cellComponent ? 'CustomCell(props) => (…)' : undefined,
            tooltip: mappedSettings.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
        },
        {
            pkg: '@nivo/waffle',
            defaults: WaffleDefaultProps,
        }
    )

    return (
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="Waffle" tags={waffle.Waffle.tags} />
                <ComponentDescription description={waffle.Waffle.description} />
                <ComponentTabs
                    chartClass="waffle"
                    code={code}
                    data={data}
                    diceRoll={diceRoll}
                    nodeCount={settings.rows * settings.columns}
                >
                    <ResponsiveWaffle data={data} {...mappedSettings} onClick={onClick} />
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={true} />
                <ComponentSettings
                    component="Waffle"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.Waffle}
                />
            </ComponentPage>
        </Layout>
    )
}

export default Waffle
