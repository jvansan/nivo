/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import merge from 'lodash/merge'
import {
    ResponsiveParallelCoordinatesCanvas,
    commonDefaultProps as defaultProps,
} from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
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
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groupsByScope } from '../../data/components/parallel-coordinates/props'
import variables from '../../data/components/parallel-coordinates/variables'

const lineCount = 320

const initialSettings = {
    variables,
    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },
    layout: defaultProps.layout,
    curve: defaultProps.curve,
    colors: defaultProps.colors,
    colorBy: defaultProps.colorBy,
    strokeWidth: 1,
    lineOpacity: 0.2,
    axesPlan: defaultProps.axesPlan,
    axesTicksPosition: defaultProps.axesTicksPosition,
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
}

const ParallelCoordinatesCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateParallelCoordinatesData({ size: lineCount }))
    const diceRoll = useCallback(
        () => setData(generateParallelCoordinatesData({ size: lineCount })),
        [setData]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveParallelCoordinatesCanvas', mappedSettings, {
        pkg: '@nivo/parallel-coordinates',
        defaults: defaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="ParallelCoordinatesCanvas" keywords={meta.ParallelCoordinatesCanvas.tags} />
            <ComponentHeader
                chartClass="ParallelCoordinatesCanvas"
                tags={meta.ParallelCoordinatesCanvas.tags}
            />
            <ComponentDescription description={meta.ParallelCoordinatesCanvas.description} />
            <ComponentTabs
                chartClass="parallel-coordinates"
                code={code}
                data={data}
                diceRoll={diceRoll}
                nodeCount={lineCount}
                nodeCountWording="lines"
            >
                <ResponsiveParallelCoordinatesCanvas
                    data={data}
                    {...mappedSettings}
                    theme={merge({}, theme.nivo, {
                        axis: {
                            ticks: {
                                line: {
                                    strokeWidth: 2,
                                    strokeLinecap: 'square',
                                },
                            },
                            domain: {
                                line: {
                                    strokeWidth: 2,
                                    strokeLinecap: 'square',
                                },
                            },
                        },
                    })}
                />
            </ComponentTabs>
            <ComponentSettings
                component="ParallelCoordinatesCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.ParallelCoordinatesCanvas}
            />
        </ComponentPage>
    )
}

export default ParallelCoordinatesCanvas
