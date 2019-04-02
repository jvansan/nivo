/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
// import merge from 'lodash/merge'
import {
    ResponsiveParallelCoordinatesCanvas,
    commonDefaultProps as defaultProps,
} from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import parallelCoordinates from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groupsByScope } from '../../data/components/parallel-coordinates/props'
import variables from '../../data/components/parallel-coordinates/variables'
// import nivoTheme from '../../../nivoTheme'

const lineCount = 320

export default class ParallelCoordinatesCanvas extends Component {
    state = {
        data: generateParallelCoordinatesData({ size: lineCount }),
        settings: {
            variables,
            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },
            layout: defaultProps.layout,
            curve: defaultProps.curve,
            colors: defaultProps.colors,
            colorBy: defaultProps.colorBy,
            strokeWidth: 1,
            lineOpacity: 0.2,
            axesPlan: defaultProps.axesPlan,
            axesTicksPosition: defaultProps.axesTicksPosition,
            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
            /*
            theme: merge({}, nivoTheme, {
                axis: {
                    ticks: {
                        line: {
                            strokeWidth: 2,
                            strokeLinecap: 'square',
                        },
                    },
                    domain: {
                        line: {
                            strokeWidth: 2,
                            strokeLinecap: 'square',
                        },
                    },
                },
            }),
            */
        },
    }

    diceRoll = () => {
        this.setState({ data: generateParallelCoordinatesData({ size: lineCount }) })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode('ResponsiveParallelCoordinatesCanvas', mappedSettings, {
            pkg: '@nivo/parallel-coordinates',
            defaults: defaultProps,
        })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader
                        chartClass="ParallelCoordinatesCanvas"
                        tags={parallelCoordinates.ParallelCoordinatesCanvas.tags}
                    />
                    <ComponentDescription
                        description={parallelCoordinates.ParallelCoordinatesCanvas.description}
                    />
                    <ComponentTabs
                        chartClass="parallel-coordinates"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                        nodeCount={lineCount}
                        nodeCountWording="lines"
                    >
                        <ResponsiveParallelCoordinatesCanvas data={data} {...mappedSettings} />
                    </ComponentTabs>
                    <ComponentSettings
                        component="ParallelCoordinatesCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.ParallelCoordinatesCanvas}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
