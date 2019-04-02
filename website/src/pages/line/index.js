/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import omit from 'lodash/omit'
import { ResponsiveLine, LineDefaultProps } from '@nivo/line'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import line from '../../data/components/line/meta.yml'
import mapper from '../../data/components/line/mapper'
import { groupsByScope } from '../../data/components/line/props'
import defaultSettings from '../../data/components/line/defaults'
import { generateData } from '../../data/components/line/generator'
// import nivoTheme from '../../../nivoTheme'

export default class Line extends Component {
    state = {
        data: generateData(),
        settings: {
            ...omit(defaultSettings, ['width', 'height']),
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    onClick: data => {
                        alert(JSON.stringify(data, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
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
        this.setState({ data: generateData() })
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode('ResponsiveLine', mappedSettings, {
            pkg: '@nivo/line',
            defaults: LineDefaultProps,
        })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="Line" tags={line.Line.tags} />
                    <ComponentDescription description={line.Line.description} />
                    <ComponentTabs
                        chartClass="line"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveLine
                            data={data}
                            {...mappedSettings}
                            // theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="Line"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Line}
                    />
                    <Stories stories={line.Line.stories} isFullWidth={true} />
                </ComponentPage>
            </Layout>
        )
    }
}
