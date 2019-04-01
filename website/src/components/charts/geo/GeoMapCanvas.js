/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveGeoMapCanvas, GeoMapCanvasDefaultProps } from '@nivo/geo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ComponentDescription from '../../ComponentDescription'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import { groupsByScope } from './GeoControls'
import nivoTheme from '../../../nivoTheme'
import countries from './world_countries'
import ChartPage from '../ChartPage'
import propsMapper from './propsMapper'

const initialSettings = {
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

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
A canvas implementation of the [GeoMap](self:/geomap) component,
should be used used when you have complex geometries as it offers better
performance than its SVG counterpart.

The responsive alternative of this component is \`ResponsiveGeoMap\`.
`

const GeoMapCanvas = () => {
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
        'ResponsiveGeoMapCanvas',
        {
            features: [],
            ...mappedSettings,
        },
        {
            pkg: '@nivo/geo',
            defaults: GeoMapCanvasDefaultProps,
        }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="GeoMapCanvas" tags={['@nivo/geo', 'map', 'canvas']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="geomap" code={code}>
                <ResponsiveGeoMapCanvas
                    features={countries.features}
                    onClick={onClick}
                    {...mappedSettings}
                />
            </ChartTabs>
            <Settings
                component="GeoMapCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.GeoMapCanvas}
            />
        </ChartPage>
    )
}

export default GeoMapCanvas
