/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChord } from '@nivo/chord'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import chord from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groupsByScope } from '../../data/components/chord/props'
// import nivoTheme from '../../../nivoTheme'

const MATRIX_SIZE = 5

export default class Chord extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
        settings: {
            margin: {
                top: 60,
                right: 60,
                bottom: 90,
                left: 60,
            },

            padAngle: 0.02,
            innerRadiusRatio: 0.96,
            innerRadiusOffset: 0.02,

            arcOpacity: 1,
            arcBorderWidth: 1,
            arcBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            ribbonOpacity: 0.5,
            ribbonBorderWidth: 1,
            ribbonBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            enableLabel: true,
            label: 'id',
            labelOffset: 12,
            labelRotation: -90,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1,
            },

            colors: 'nivo',

            isInteractive: true,
            arcHoverOpacity: 1,
            arcHoverOthersOpacity: 0.25,
            ribbonHoverOpacity: 0.75,
            ribbonHoverOthersOpacity: 0.25,

            animate: true,
            motionStiffness: 90,
            motionDamping: 7,

            legends: [
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 70,
                    itemWidth: 80,
                    itemHeight: 14,
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
        this.setState({ ...generateChordData({ size: MATRIX_SIZE }) })
    }

    render() {
        const { settings, matrix, keys } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode(
            'ResponsiveChord',
            { keys, ...mappedSettings },
            {
                pkg: '@nivo/chord',
                dataKey: 'matrix',
            }
        )

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="Chord" tags={chord.Chord.tags} />
                    <ComponentDescription description={chord.Chord.description} />
                    <ComponentTabs
                        chartClass="chord"
                        code={code}
                        data={matrix}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveChord
                            matrix={matrix}
                            keys={keys}
                            {...mappedSettings}
                            //theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="Chord"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Chord}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
