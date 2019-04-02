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
import { ResponsiveChordCanvas } from '@nivo/chord'
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

const MATRIX_SIZE = 38

export default class ChordCanvas extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
        settings: {
            margin: {
                top: 60,
                right: 60,
                bottom: 60,
                left: 60,
            },

            pixelRatio:
                typeof window !== 'undefined' && window.devicePixelRatio
                    ? window.devicePixelRatio
                    : 1,

            padAngle: 0.006,
            innerRadiusRatio: 0.86,
            innerRadiusOffset: 0,

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
            labelOffset: 9,
            labelRotation: -90,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1,
            },

            colors: 'paired',

            isInteractive: true,
            arcHoverOpacity: 1,
            arcHoverOthersOpacity: 0.4,
            ribbonHoverOpacity: 0.75,
            ribbonHoverOthersOpacity: 0,

            animate: true,
            motionStiffness: 90,
            motionDamping: 7,
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
            'ResponsiveChordCanvas',
            { keys, ...mappedSettings },
            {
                pkg: '@nivo/calendar',
                dataKey: 'matrix',
            }
        )

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="ChordCanvas" tags={chord.ChordCanvas.tags} />
                    <ComponentDescription description={chord.ChordCanvas.description} />
                    <ComponentTabs
                        chartClass="chord"
                        code={code}
                        data={matrix}
                        diceRoll={this.diceRoll}
                        nodeCount={MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}
                    >
                        <ResponsiveChordCanvas
                            matrix={matrix}
                            keys={keys}
                            {...mappedSettings}
                            //theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="ChordCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.ChordCanvas}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
