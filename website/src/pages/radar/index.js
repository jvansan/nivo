/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { generateWinesTastes } from '@nivo/generators'
import { ResponsiveRadar } from '@nivo/radar'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import radar from '../../data/components/radar/meta.yml'
import mapper from '../../data/components/radar/mapper'
import { groupsByScope } from '../../data/components/radar/props'
//import nivoTheme from '../../../nivoTheme'

export default class Radar extends Component {
    state = {
        data: generateWinesTastes(),
        settings: {
            indexBy: 'taste',
            maxValue: 'auto',

            margin: {
                top: 70,
                right: 80,
                bottom: 40,
                left: 80,
            },

            curve: 'catmullRomClosed',

            borderWidth: 2,
            borderColor: { type: 'inherit' },

            gridLevels: 5,
            gridShape: 'circular',
            gridLabelOffset: 36,

            enableDots: true,
            dotSize: 8,
            dotColor: { type: 'inherit' },
            dotBorderWidth: 0,
            dotBorderColor: { type: 'custom', color: '#ffffff' },
            enableDotLabel: true,
            dotLabel: 'value',
            dotLabelYOffset: -12,

            colors: 'nivo',
            colorBy: 'key',
            fillOpacity: 0.1,

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,

            legends: [
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    onClick: d => {
                        alert(JSON.stringify(d, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ],
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ data: generateWinesTastes() })
    }

    render() {
        const { settings, data } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode(
            'ResponsiveRadar',
            {
                keys: data.keys,
                ...mappedSettings,
            },
            { pkg: '@nivo/radar' }
        )

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="Radar" tags={radar.Radar.tags} />
                    <ComponentDescription description={radar.Radar.description} />
                    <ComponentTabs
                        chartClass="radar"
                        code={code}
                        data={data.data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveRadar
                            data={data.data}
                            keys={data.keys}
                            {...mappedSettings}
                            //theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="Radar"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Radar}
                    />
                    <Stories isFullWidth={true} stories={radar.Radar.stories} />
                </ComponentPage>
            </Layout>
        )
    }
}
