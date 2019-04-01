/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ResponsiveChordCanvas } from '@nivo/chord'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Settings from '../../Settings'
import { groupsByScope } from './ChordControls'
import ComponentDescription from '../../ComponentDescription'
import generateCode from '../../../lib/generateChartCode'
import nivoTheme from '../../../nivoTheme'
import { generateChordData } from '@nivo/generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const MATRIX_SIZE = 38

const description = `
A variation around the [Chord](self:/chord) component. Well suited
for large data sets as it does not impact DOM tree depth, however
you'll lose the isomorphic ability and transitions (for now).

The responsive alternative of this component is
\`ResponsiveChordCanvas\`.
`

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

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

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

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveChordCanvas',
            { keys, ...mappedSettings },
            {
                pkg: '@nivo/calendar',
                dataKey: 'matrix',
            }
        )

        return (
            <ChartPage>
                <ChartHeader
                    chartClass="ChordCanvas"
                    tags={['@nivo/chord', 'relational', 'canvas']}
                />
                <ComponentDescription description={description} />
                <ChartTabs
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
                        theme={nivoTheme}
                    />
                </ChartTabs>
                <Settings
                    component="ChordCanvas"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.ChordCanvas}
                />
            </ChartPage>
        )
    }
}
