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
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import geo from '../../data/components/geo/meta.yml'
import mapper from '../../data/components/geo/mapper'
import { groupsByScope } from '../../data/components/geo/props'
import countries from '../../data/components/geo/world_countries'
// import nivoTheme from '../../../nivoTheme'

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

    /*
    theme: {
        ...nivoTheme,
        background: '#999999',
    },
    */
}

const GeoMap = () => {
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
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="GeoMap" tags={geo.GeoMap.tags} />
                <ComponentDescription description={geo.GeoMap.description} />
                <ComponentTabs chartClass="geomap" code={code}>
                    <ResponsiveGeoMap
                        features={countries.features}
                        onClick={onClick}
                        {...mappedSettings}
                    />
                </ComponentTabs>
                <ComponentSettings
                    component="GeoMap"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.GeoMap}
                />
            </ComponentPage>
        </Layout>
    )
}

export default GeoMap
