/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveChoroplethCanvas, ChoroplethCanvasDefaultProps } from '@nivo/geo'
import nivoTheme from '../../../nivoTheme'
import generateCode from '../../../lib/generateChartCode'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ComponentDescription from '../../ComponentDescription'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './GeoControls'
import countries from './world_countries'
import { generateChoroplethData } from './generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialSettings = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    colors: 'PiYG',
    unknownColor: '#101b42',

    label: 'properties.name',
    value: 'value',
    valueFormat: '.2s',

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#101b42',

    borderWidth: 0.5,
    borderColor: {
        type: 'custom',
        color: '#101b42',
    },

    isInteractive: true,
    'custom tooltip example': false,

    legends: [
        {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -60,
            itemsSpacing: 0,
            itemWidth: 86,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 18,
        },
    ],

    theme: {
        ...nivoTheme,
    },
}

const description = `
A canvas implementation of the [Choropleth](self:/choropleth)
component, should be used used when you have complex geometries
as it offers better performance than its SVG counterpart.

The responsive alternative of this component is
\`ResponsiveChoropleth\`.
`

const ChoroplethCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateChoroplethData())
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        feature => {
            logAction({
                type: 'click',
                label: `${feature.label}: ${feature.formattedValue} (${feature.id})`,
                data: {
                    label: feature.label,
                    value: feature.value,
                    formattedValue: feature.formattedValue,
                    data: feature.data,
                },
            })
        },
        [logAction]
    )
    const diceRoll = useCallback(() => setData(generateChoroplethData()), [setData])

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveChoroplethCanvas',
        {
            features: [],
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/geo',
            defaults: ChoroplethCanvasDefaultProps,
        }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="ChoroplethCanvas" tags={['@nivo/geo', 'map', 'canvas']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="choropleth" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveChoroplethCanvas
                    features={countries.features}
                    data={data}
                    onClick={onClick}
                    {...mappedSettings}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="ChoroplethCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.ChoroplethCanvas}
            />
        </ChartPage>
    )
}

export default ChoroplethCanvas
