/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import omit from 'lodash/omit'
import { ResponsiveTreeMapCanvas, TreeMapCanvasDefaultProps } from '@nivo/treemap'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import treemap from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groupsByScope } from '../../data/components/treemap/props'
import { generateHeavyDataSet } from '../../data/components/treemap/generator'
//import nivoTheme from '../../../nivoTheme'

const initialSettings = {
    tile: 'squarify',
    leavesOnly: true,
    innerPadding: 1,
    outerPadding: 0,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    enableLabel: true,
    labelFormat: '.0s',
    labelSkipSize: 18,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.6,
    },
    orientLabel: true,

    colors: 'paired',
    colorBy: 'id',
    borderWidth: 1,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    isInteractive: true,
}

const TreeMapCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateHeavyDataSet())
    const diceRoll = useCallback(() => setData(generateHeavyDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[cell] ${node.id}: ${node.value}`,
                data: omit(node, ['parent', 'children']),
            })
        },
        [logAction]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveTreeMapCanvas', mappedSettings, {
        dataKey: 'root',
        pkg: '@nivo/treemap',
        defaults: TreeMapCanvasDefaultProps,
    })

    return (
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="TreeMapCanvas" tags={treemap.TreeMapCanvas.tags} />
                <ComponentDescription description={treemap.TreeMapCanvas.description} />
                <ComponentTabs
                    chartClass="treemap"
                    code={code}
                    data={data.root}
                    diceRoll={diceRoll}
                    nodeCount={data.nodeCount}
                >
                    <ResponsiveTreeMapCanvas
                        root={data.root}
                        {...mappedSettings}
                        //theme={nivoTheme}
                        onClick={onClick}
                    />
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={true} />
                <ComponentSettings
                    component="TreeMapCanvas"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.TreeMapCanvas}
                />
            </ComponentPage>
        </Layout>
    )
}

export default TreeMapCanvas
