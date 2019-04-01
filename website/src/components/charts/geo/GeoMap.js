/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveGeoMap, GeoMapDefaultProps } from '@nivo/geo'
import nivoTheme from '../../../nivoTheme'
import generateCode from '../../../lib/generateChartCode'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ComponentDescription from '../../ComponentDescription'
import Settings from '../../Settings'
import { groupsByScope } from './GeoControls'
import countries from './world_countries'
import ChartPage from '../ChartPage'
import propsMapper from './propsMapper'

const initialSettings = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    fillColor: '#eeeeee',
    borderWidth: 0.5,
    borderColor: {
        type: 'custom',
        color: '#333333',
    },

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#666666',

    isInteractive: true,

    theme: {
        ...nivoTheme,
        background: '#999999',
    },
}

const description = `
This component can be used to draw maps, it takes an array of
features which determine the geometries to render on the map.
It can be used to build more complex maps such as
the [Choropleth](self:/choropleth).

Using this component requires some knowledge about the \`d3-geo\`
library, projections, geoJSON… please have a look at the
[official d3 documentation](https://github.com/d3/d3-geo)
for further information.

The responsive alternative of this component is \`ResponsiveGeoMap\`,
it also offers a canvas implementations, see
[GeoMapCanvas](self:/geomap/canvas).
`

const GeoMap = () => {
    const [settings, setSettings] = useState(initialSettings)
    const onClick = useCallback((feature, event) => {
        alert(
            `${feature.properties.name} (${feature.id})\nclicked at x: ${event.clientX}, y: ${
                event.clientY
            }`
        )
    })

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveGeoMap',
        {
            features: [],
            ...mappedSettings,
        },
        {
            pkg: '@nivo/geo',
            defaults: GeoMapDefaultProps,
        }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="GeoMap" tags={['@nivo/geo', 'map', 'svg', 'isomorphic']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="geomap" code={code}>
                <ResponsiveGeoMap
                    features={countries.features}
                    onClick={onClick}
                    {...mappedSettings}
                />
            </ChartTabs>
            <Settings
                component="GeoMap"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.GeoMap}
            />
        </ChartPage>
    )
}

export default GeoMap
