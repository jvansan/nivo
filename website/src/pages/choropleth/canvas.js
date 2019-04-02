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
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import geo from '../../data/components/geo/meta.yml'
import mapper from '../../data/components/geo/mapper'
import { groupsByScope } from '../../data/components/geo/props'
import { generateChoroplethData } from '../../data/components/geo/generator'
import countries from '../../data/components/geo/world_countries'
// import nivoTheme from '../../../nivoTheme'

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

    /*
    theme: {
        ...nivoTheme,
    },
    */
}

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

    const mappedSettings = mapper(settings)

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
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="ChoroplethCanvas" tags={geo.ChoroplethCanvas.tags} />
                <ComponentDescription description={geo.ChoroplethCanvas.description} />
                <ComponentTabs chartClass="choropleth" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveChoroplethCanvas
                        features={countries.features}
                        data={data}
                        onClick={onClick}
                        {...mappedSettings}
                    />
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={true} />
                <ComponentSettings
                    component="ChoroplethCanvas"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.ChoroplethCanvas}
                />
            </ComponentPage>
        </Layout>
    )
}

export default ChoroplethCanvas
