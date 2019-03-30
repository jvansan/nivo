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
import { ResponsiveBubble, BubbleDefaultProps } from '@nivo/circle-packing'
import { patternLinesDef } from '@nivo/core'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import { groupsByScope } from './BubbleControls'
import Stories from '../../Stories'
import { bubbleStories } from './stories'
import nivoTheme from '../../../nivoTheme'
import ComponentDescription from '../../ComponentDescription'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import propsMapper from './propsMapper'
import { generateLibTree } from '@nivo/generators'
import ChartPage from '../ChartPage'

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

const description = `
Bubble chart using circle packing with zooming ability. You can fully customize
it using \`nodeComponent\` property to define your own node component,
if you wish to do so you should have a look at
[native SVG node component](https://github.com/plouc/nivo/blob/master/src/components/charts/bubble/BubbleNode.js)
for available properties.

The responsive alternative of this component is \`ResponsiveBubble\`.
It also offers various implementations, see
[BubbleHtml](self:/bubble/html) and
[BubbleCanvas](self:/bubble/canvas).

This component is available in the
[nivo-api](https://github.com/plouc/nivo-api),
see [sample](api:/samples/bubble.svg)
or [try it using the API client](self:/bubble/api).
You can also see more example usages in
[the storybook](storybook:?selectedKind=Bubble&selectedStory=default).
`

const Bubble = () => {
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

    const mappedSettings = propsMapper(settings)

    const code = generateCode('ResponsiveBubble', mappedSettings, {
        pkg: '@nivo/circle-packing',
        defaults: BubbleDefaultProps,
    })

    return (
        <ChartPage>
            <ChartHeader
                chartClass="Bubble"
                tags={['@nivo/circle-packing', 'hierarchy', 'svg', 'isomorphic']}
            />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="circle-packing" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveBubble
                    root={cloneDeep(data)}
                    {...mappedSettings}
                    theme={nivoTheme}
                    onClick={onClick}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} />
            <Settings
                component="Bubble"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Bubble}
            />
            <Stories stories={bubbleStories} />
        </ChartPage>
    )
}

export default Bubble
