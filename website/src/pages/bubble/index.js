/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { patternLinesDef } from '@nivo/core'
import { ResponsiveBubble, BubbleDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/bubble/meta.yml'
import mapper from '../../data/components/bubble/mapper'
import { groupsByScope } from '../../data/components/bubble/props'

const initialSettings = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    identity: 'name',
    value: 'loc',
    colors: 'nivo',
    colorBy: 'depth',
    padding: 6,
    leavesOnly: false,

    enableLabel: true,
    label: 'id',
    labelSkipRadius: 8,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    borderWidth: 2,
    borderColor: {
        type: 'inherit',
    },

    defs: [
        patternLinesDef('lines', {
            background: 'none',
            color: 'inherit',
            rotation: -45,
            lineWidth: 5,
            spacing: 8,
        }),
    ],
    fill: [{ match: { depth: 1 }, id: 'lines' }],

    animate: true,
    motionStiffness: 90,
    motionDamping: 12,

    isInteractive: true,

    isZoomable: true,
}

const Bubble = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLibTree())
    const diceRoll = useCallback(() => setData(generateLibTree()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        ({ children, parent, ...node }) => {
            logAction({
                type: 'click',
                label: `${node.id}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveBubble', mappedSettings, {
        pkg: '@nivo/circle-packing',
        defaults: BubbleDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="Bubble" keywords={meta.Bubble.tags} />
            <ComponentHeader chartClass="Bubble" tags={meta.Bubble.tags} />
            <ComponentDescription description={meta.Bubble.description} />
            <ComponentTabs chartClass="circle-packing" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveBubble
                    root={cloneDeep(data)}
                    {...mappedSettings}
                    theme={theme.nivo}
                    onClick={onClick}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} />
            <ComponentSettings
                component="Bubble"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Bubble}
            />
            <Stories stories={meta.Bubble.stories} />
        </ComponentPage>
    )
}

export default Bubble
