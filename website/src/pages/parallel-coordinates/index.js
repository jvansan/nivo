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
    ResponsiveParallelCoordinates,
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

export default class ParallelCoordinates extends Component {
    state = {
        data: generateParallelCoordinatesData({ size: 32 }),
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
            strokeWidth: defaultProps.strokeWidth,
            lineOpacity: defaultProps.lineOpacity,
            axesPlan: defaultProps.axesPlan,
            axesTicksPosition: defaultProps.axesTicksPosition,
            animate: true,
            motionStiffness: 90,
            motionDamping: 12,
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
        this.setState({ data: generateParallelCoordinatesData({ size: 32 }) })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode('ResponsiveParallelCoordinates', mappedSettings, {
            pkg: '@nivo/parallel-coordinates',
            defaults: defaultProps,
        })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader
                        chartClass="ParallelCoordinates"
                        tags={parallelCoordinates.ParallelCoordinates.tags}
                    />
                    <ComponentDescription
                        description={parallelCoordinates.ParallelCoordinates.description}
                    />
                    <ComponentTabs
                        chartClass="parallel-coordinates"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveParallelCoordinates data={data} {...mappedSettings} />
                    </ComponentTabs>
                    <ComponentSettings
                        component="ParallelCoordinates"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.ParallelCoordinates}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
