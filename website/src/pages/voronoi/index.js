/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import range from 'lodash/range'
import { ResponsiveVoronoi, VoronoiDefaultProps } from '@nivo/voronoi'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import voronoi from '../../data/components/voronoi/meta.yml'
import { groupsByScope } from '../../data/components/voronoi/props'
//import nivoTheme from '../../../nivoTheme'

const xDomain = [0, 100]
const yDomain = [0, 100]

const generateData = () =>
    range(100).map(id => ({ id, x: Math.random() * xDomain[1], y: Math.random() * yDomain[1] }))

export default class Voronoi extends Component {
    constructor(props) {
        super(props)

        this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)

        this.state = {
            data: generateData(),
            settings: {
                ...Voronoi.defaultProps,

                xDomain,
                yDomain,

                margin: {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1,
                },

                enableLinks: true,
                linkLineWidth: 1,
                linkLineColor: '#cccccc',

                enableCells: true,
                cellLineWidth: 2,
                cellLineColor: '#c6432d',

                enablePoints: true,
                pointSize: 6,
                pointColor: '#c6432d',
            },
        }
    }

    diceRoll = () => {
        this.setState({
            data: generateData(),
        })
    }

    handleSettingsUpdate(settings) {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const code = generateCode('ResponsiveVoronoi', settings, {
            pkg: '@nivo/voronoi',
            defaults: VoronoiDefaultProps,
        })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="Voronoi" tags={voronoi.Voronoi.tags} />
                    <ComponentDescription description={voronoi.Voronoi.description} />
                    <ComponentTabs
                        chartClass="voronoi"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveVoronoi
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            data={data}
                            xDomain={xDomain}
                            yDomain={yDomain}
                            {...settings}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="Voronoi"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Voronoi}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
