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
import { ResponsiveTreeMap, TreeMapDefaultProps } from '@nivo/treemap'
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
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groupsByScope } from '../../data/components/treemap/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

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

const TreeMap = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])
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

    const code = generateCode('ResponsiveTreeMap', mappedSettings, {
        dataKey: 'root',
        pkg: '@nivo/treemap',
        defaults: TreeMapDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="TreeMap" keywords={meta.TreeMap.tags} />
            <ComponentHeader chartClass="TreeMap" tags={meta.TreeMap.tags} />
            <ComponentDescription description={meta.TreeMap.description} />
            <ComponentTabs chartClass="treemap" code={code} data={data.root} diceRoll={diceRoll}>
                <ResponsiveTreeMap
                    root={data.root}
                    {...mappedSettings}
                    theme={theme.nivo}
                    onClick={onClick}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <ComponentSettings
                component="TreeMap"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.TreeMap}
            />
        </ComponentPage>
    )
}

export default TreeMap
