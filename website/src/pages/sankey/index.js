/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import random from 'lodash/random'
import { generateSankeyData } from '@nivo/generators'
import { ResponsiveSankey, SankeyDefaultProps } from '@nivo/sankey'
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/sankey/meta.yml'
import mapper from '../../data/components/sankey/mapper'
import { groupsByScope } from '../../data/components/sankey/props'

const initialSettings = {
    margin: {
        top: 40,
        right: 160,
        bottom: 40,
        left: 50,
    },

    layout: 'horizontal',
    align: 'justify',
    sort: 'auto',
    colors: 'category10',

    nodeOpacity: 1,
    nodeHoverOpacity: 1,
    nodeThickness: 18,
    nodeInnerPadding: 3,
    nodeSpacing: 24,
    nodeBorderWidth: 0,
    nodeBorderColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    linkOpacity: 0.5,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.1,
    linkContract: 0,
    linkBlendMode: 'multiply',
    enableLinkGradient: true,

    enableLabels: true,
    labelPosition: 'outside',
    labelOrientation: 'vertical',
    labelPadding: 16,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1,
    },

    animate: true,
    motionStiffness: 140,
    motionDamping: 13,

    isInteractive: true,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: 'right-to-left',
            itemsSpacing: 2,
            itemTextColor: '#999',
            symbolSize: 14,
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const Sankey = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateSankeyData({ nodeCount: 6, maxIterations: 8 }))
    const diceRoll = useCallback(() => {
        setData(data => ({
            ...data,
            links: data.links.map(link => ({
                ...link,
                value: random(5, 200),
            })),
        }))
    }, [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveSankey', mappedSettings, {
        pkg: '@nivo/sankey',
        defaults: SankeyDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="Sankey" keywords={meta.Sankey.tags} />
            <ComponentHeader chartClass="Sankey" tags={meta.Sankey.tags} />
            <ComponentDescription description={meta.Sankey.description} />
            <ComponentTabs chartClass="sankey" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveSankey data={data} {...mappedSettings} theme={theme.nivo} />
            </ComponentTabs>
            <ComponentSettings
                component="Sankey"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Sankey}
            />
        </ComponentPage>
    )
}

export default Sankey
