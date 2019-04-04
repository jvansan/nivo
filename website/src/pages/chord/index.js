/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChord } from '@nivo/chord'
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
import meta from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groupsByScope } from '../../data/components/chord/props'

const MATRIX_SIZE = 5

const initialSettings = {
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },

    padAngle: 0.02,
    innerRadiusRatio: 0.96,
    innerRadiusOffset: 0.02,

    arcOpacity: 1,
    arcBorderWidth: 1,
    arcBorderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,
    ribbonBorderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: -90,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1,
    },

    colors: 'nivo',

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.25,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0.25,

    animate: true,
    motionStiffness: 90,
    motionDamping: 7,

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            translateY: 70,
            itemWidth: 80,
            itemHeight: 14,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
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

const Chord = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateChordData({ size: MATRIX_SIZE }))
    const diceRoll = useCallback(() => setData(generateChordData({ size: MATRIX_SIZE })), [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveChord',
        { keys: data.keys, ...mappedSettings },
        {
            pkg: '@nivo/chord',
            dataKey: 'matrix',
        }
    )

    return (
        <ComponentPage>
            <SEO title="Chord" keywords={meta.Chord.tags} />
            <ComponentHeader chartClass="Chord" tags={meta.Chord.tags} />
            <ComponentDescription description={meta.Chord.description} />
            <ComponentTabs chartClass="chord" code={code} data={data.matrix} diceRoll={diceRoll}>
                <ResponsiveChord
                    matrix={data.matrix}
                    keys={data.keys}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="Chord"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Chord}
            />
        </ComponentPage>
    )
}

export default Chord
