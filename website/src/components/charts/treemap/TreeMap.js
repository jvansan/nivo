/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveTreeMap, TreeMapDefaultProps } from '@nivo/treemap'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './TreeMapControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const initialSettings = {
    identity: 'name',
    value: 'loc',
    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 3,
    outerPadding: 3,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: 'loc',
    labelFormat: '.0s',
    labelSkipSize: 12,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.2,
    },
    orientLabel: true,

    colors: 'nivo',
    colorBy: 'depth',
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,
}

const description = `
A tree map component using
[d3-hierarchy.treemap](https://github.com/d3/d3-hierarchy#treemap),
see [this demo](https://observablehq.com/@d3/treemap).

You can fully customize it using \`nodeComponent\` property to define
your own node component, if you wish to do so you should have a look at
[native SVG node component](https://github.com/plouc/nivo/blob/master/src/components/charts/treemap/TreeMapNode.js)
for available properties.

The responsive alternative of this component is \`ResponsiveTreeMap\`,
it also offers other implementations, see
[TreeMapHtml](self:/treemap/html) and
[TreeMapCanvas](self:/treemap/canvas).

The \`TreeMap\` component is also available in the \`@nivo/api\`,
see [sample](api:/samples/treemap)
or [try it using the API client](self:/treemap/api).
`

const TreeMap = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[cell] ${node.id}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode('ResponsiveTreeMap', mappedSettings, {
        dataKey: 'root',
        pkg: '@nivo/treemap',
        defaults: TreeMapDefaultProps,
    })

    return (
        <ChartPage>
            <ChartHeader
                chartClass="TreeMap"
                tags={['@nivo/treemap', 'hierarchy', 'svg', 'isomorphic']}
            />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="treemap" code={code} data={data.root} diceRoll={diceRoll}>
                <ResponsiveTreeMap
                    root={data.root}
                    {...mappedSettings}
                    theme={nivoTheme}
                    onClick={onClick}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="TreeMap"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.TreeMap}
            />
        </ChartPage>
    )
}

export default TreeMap
