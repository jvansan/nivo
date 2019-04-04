/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
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
import meta from '../../data/components/stream/meta.yml'
import mapper from '../../data/components/stream/mapper'
import { groupsByScope } from '../../data/components/stream/props'
import { generateLightDataSet } from '../../data/components/stream/generator'
import defaultSettings from '../../data/components/stream/defaults'

const initialSettings = {
    ...defaultSettings,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                    },
                },
            ],
        },
    ],
}

const Stream = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveStream',
        {
            keys: data.keys,
            ...mappedSettings,
        },
        {
            pkg: '@nivo/stream',
            defaults: StreamDefaultProps,
        }
    )

    return (
        <ComponentPage>
            <SEO title="Stream" keywords={meta.Stream.tags} />
            <ComponentHeader chartClass="Stream" tags={meta.Stream.tags} />
            <ComponentDescription description={meta.Stream.description} />
            <ComponentTabs chartClass="stream" code={code} data={data.data} diceRoll={diceRoll}>
                <ResponsiveStream
                    data={data.data}
                    keys={data.keys}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="Stream"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Stream}
            />
        </ComponentPage>
    )
}

export default Stream
