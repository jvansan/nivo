/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveChoropleth, ChoroplethDefaultProps } from '@nivo/geo'
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

    colors: 'nivo',
    unknownColor: '#666666',

    label: 'properties.name',
    value: 'value',
    valueFormat: '.2s',

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#dddddd',

    borderWidth: 0.5,
    borderColor: {
        type: 'custom',
        color: '#152538',
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],

    theme: {
        ...nivoTheme,
    },
}

const description = `
The Choropleth component displays divided geographical areas shaded
in relation to some data variable. It's build on top of primitives
from the [GeoMap](self:/geomap) component.

Using this component requires some knowledge about the \`d3-geo\`
library, projections, geoJSON… please have a look at the
[official d3 documentation](https://github.com/d3/d3-geo)
for further information.

Like for [GeoMap](self:/geomap), you must pass an array of features
which determine the geometries to render on the map, then you pass
an array of data which, each datum is merged with its corresponding
feature using the \`match\` property, the value is picked according
to the \`value\` accessor.

The responsive alternative of this component is \`ResponsiveChoropleth\`.
This component also have a canvas implementations,
[ChoroplethCanvas](self:/choropleth/canvas), which should be used
when you have complex geometries as it offers better performance.
`

const Choropleth = () => {
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
        'ResponsiveChoropleth',
        {
            features: [],
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/geo',
            defaults: ChoroplethDefaultProps,
        }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="Choropleth" tags={['@nivo/geo', 'map', 'svg', 'isomorphic']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="choropleth" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveChoropleth
                    features={countries.features}
                    data={data}
                    onClick={onClick}
                    {...mappedSettings}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="Choropleth"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Choropleth}
            />
        </ChartPage>
    )
}

export default Choropleth
