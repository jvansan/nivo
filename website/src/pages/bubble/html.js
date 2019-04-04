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
import { ResponsiveBubbleHtml, BubbleHtmlDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
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

const initialSettings = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    identity: 'name',
    value: 'loc',
    colors: 'paired',
    colorBy: 'depth',
    padding: 1,
    leavesOnly: false,

    enableLabel: true,
    label: 'id',
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

const BubbleHtml = () => {
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

    const code = generateCode('ResponsiveBubbleHtml', mappedSettings, {
        pkg: '@nivo/circle-packing',
        defaults: BubbleHtmlDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="BubbleHtml" keywords={meta.BubbleHtml.tags} />
            <ComponentHeader chartClass="BubbleHtml" tags={meta.BubbleHtml.tags} />
            <ComponentDescription description={meta.BubbleHtml.description} />
            <ComponentTabs chartClass="circle-packing" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveBubbleHtml
                    root={cloneDeep(data)}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="BubbleHtml"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Bubble}
            />
        </ComponentPage>
    )
}

export default BubbleHtml
