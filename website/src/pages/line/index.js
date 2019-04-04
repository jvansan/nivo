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
import { ResponsiveLine, LineDefaultProps } from '@nivo/line'
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/line/meta.yml'
import mapper from '../../data/components/line/mapper'
import { groupsByScope } from '../../data/components/line/props'
import defaultSettings from '../../data/components/line/defaults'
import { generateData } from '../../data/components/line/generator'

const initialSettings = {
    ...omit(defaultSettings, ['width', 'height']),
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
}

const Line = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveLine', mappedSettings, {
        pkg: '@nivo/line',
        defaults: LineDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="Line" keywords={meta.Line.tags} />
            <ComponentHeader chartClass="Line" tags={meta.Line.tags} />
            <ComponentDescription description={meta.Line.description} />
            <ComponentTabs chartClass="line" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveLine data={data} {...mappedSettings} theme={theme.nivo} />
            </ComponentTabs>
            <ComponentSettings
                component="Line"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Line}
            />
            <Stories stories={meta.Line.stories} isFullWidth={true} />
        </ComponentPage>
    )
}

export default Line
