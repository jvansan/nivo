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
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/geo/meta.yml'
import mapper from '../../data/components/geo/mapper'
import { groupsByScope } from '../../data/components/geo/props'
import { generateChoroplethData } from '../../data/components/geo/generator'
import countries from '../../data/components/geo/world_countries'

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
}

const Choropleth = () => {
    const theme = useTheme()
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
        <ComponentPage>
            <SEO title="Choropleth" keywords={meta.Choropleth.tags} />
            <ComponentHeader chartClass="Choropleth" tags={meta.Choropleth.tags} />
            <ComponentDescription description={meta.Choropleth.description} />
            <ComponentTabs chartClass="choropleth" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveChoropleth
                    features={countries.features}
                    data={data}
                    onClick={onClick}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <ComponentSettings
                component="Choropleth"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Choropleth}
            />
        </ComponentPage>
    )
}

export default Choropleth
