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
import range from 'lodash/range'
import random from 'lodash/random'
import { ResponsiveBubbleCanvas, BubbleCanvasDefaultProps } from '@nivo/circle-packing'
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/bubble/meta.yml'
import mapper from '../../data/components/bubble/mapper'
import { groupsByScope } from '../../data/components/bubble/props'

const NODE_COUNT = 2000

const generateData = () => {
    return {
        id: 'root',
        children: range(NODE_COUNT).map(i => ({
            id: `node.${i}`,
            value: random(10, 100000),
        })),
    }
}

const initialSettings = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    identity: 'id',
    value: 'value',

    colors: 'set3',
    colorBy: 'id',
    padding: 1,
    leavesOnly: true,

    enableLabel: false,
    label: 'name',
    labelSkipRadius: 10,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 12,

    isInteractive: true,

    isZoomable: true,
}

const BubbleCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
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

    const code = generateCode('ResponsiveBubbleCanvas', mappedSettings, {
        pkg: '@nivo/circle-packing',
        defaults: BubbleCanvasDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="BubbleCanvas" keywords={meta.BubbleCanvas.tags} />
            <ComponentHeader chartClass="BubbleCanvas" tags={meta.BubbleCanvas.tags} />
            <ComponentDescription description={meta.BubbleCanvas.description} />
            <ComponentTabs
                chartClass="circle-packing"
                code={code}
                data={data}
                nodeCount={NODE_COUNT}
                diceRoll={diceRoll}
            >
                <ResponsiveBubbleCanvas
                    root={cloneDeep(data)}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="BubbleCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Bubble}
            />
        </ComponentPage>
    )
}

export default BubbleCanvas
