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
import meta from '../../data/components/geo/meta.yml'
import mapper from '../../data/components/geo/mapper'
import { groupsByScope } from '../../data/components/geo/props'
import countries from '../../data/components/geo/world_countries'

const initialSettings = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

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
}

const GeoMapCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const onClick = useCallback((feature, event) => {
        alert(
            `${feature.properties.name} (${feature.id})\nclicked at x: ${event.clientX}, y: ${
                event.clientY
            }`
        )
    })

    const mappedSettings = mapper(settings)

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
        <ComponentPage>
            <SEO title="GeoMapCanvas" keywords={meta.GeoMapCanvas.tags} />
            <ComponentHeader chartClass="GeoMapCanvas" tags={meta.GeoMapCanvas.tags} />
            <ComponentDescription description={meta.GeoMapCanvas.description} />
            <ComponentTabs chartClass="geomap" code={code}>
                <ResponsiveGeoMapCanvas
                    features={countries.features}
                    onClick={onClick}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="GeoMapCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.GeoMapCanvas}
            />
        </ComponentPage>
    )
}

export default GeoMapCanvas
