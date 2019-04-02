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
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './WaffleControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

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

    theme: nivoTheme,
}

const description = `
A waffle component. You can fully customize it using \`cellComponent\`
property to define your own cell component, if you wish to do so
you should have a look at
[native SVG component](https://github.com/plouc/nivo/blob/master/packages/nivo-waffle/src/WaffleCell.js)
for available properties.

You can also see more example usages in
[the storybook](storybook:waffle--default).

The responsive alternative of this component is \`ResponsiveWaffle\`,
it also offers other implementations, see
[WaffleHtml](self:/waffle/html) and
[WaffleCanvas](self:/waffle/canvas).
`

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

    const mappedSettings = propsMapper(settings, { component: 'Waffle' })

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
        <ChartPage>
            <ChartHeader chartClass="Waffle" tags={['@nivo/waffle', 'svg', 'isomorphic']} />
            <ComponentDescription description={description} />
            <ChartTabs
                chartClass="waffle"
                code={code}
                data={data}
                diceRoll={diceRoll}
                nodeCount={settings.rows * settings.columns}
            >
                <ResponsiveWaffle data={data} {...mappedSettings} onClick={onClick} />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="Waffle"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Waffle}
            />
        </ChartPage>
    )
}

export default Waffle
