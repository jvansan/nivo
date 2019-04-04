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
import { ResponsiveChordCanvas } from '@nivo/chord'
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

const MATRIX_SIZE = 38

const initialSettings = {
    margin: {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padAngle: 0.006,
    innerRadiusRatio: 0.86,
    innerRadiusOffset: 0,

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
    labelOffset: 9,
    labelRotation: -90,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1,
    },

    colors: 'paired',

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.4,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0,

    animate: true,
    motionStiffness: 90,
    motionDamping: 7,
}

const ChordCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateChordData({ size: MATRIX_SIZE }))
    const diceRoll = useCallback(() => setData(generateChordData({ size: MATRIX_SIZE })), [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveChordCanvas',
        { keys: data.keys, ...mappedSettings },
        {
            pkg: '@nivo/calendar',
            dataKey: 'matrix',
        }
    )

    return (
        <ComponentPage>
            <SEO title="ChordCanvas" keywords={meta.ChordCanvas.tags} />
            <ComponentHeader chartClass="ChordCanvas" tags={meta.ChordCanvas.tags} />
            <ComponentDescription description={meta.ChordCanvas.description} />
            <ComponentTabs
                chartClass="chord"
                code={code}
                data={data.matrix}
                diceRoll={diceRoll}
                nodeCount={MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}
            >
                <ResponsiveChordCanvas
                    matrix={data.matrix}
                    keys={data.keys}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="ChordCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.ChordCanvas}
            />
        </ComponentPage>
    )
}

export default ChordCanvas
