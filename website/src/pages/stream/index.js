/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import stream from '../../data/components/stream/meta.yml'
import mapper from '../../data/components/stream/mapper'
import { groupsByScope } from '../../data/components/stream/props'
import { generateLightDataSet } from '../../data/components/stream/generator'
import defaultSettings from '../../data/components/stream/defaults'
//import nivoTheme from '../../../nivoTheme'

export default class Stream extends Component {
    state = {
        ...generateLightDataSet(),
        settings: {
            ...defaultSettings,
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    onClick: d => {
                        alert(JSON.stringify(d, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000000',
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
        this.setState({ ...generateLightDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode(
            'ResponsiveStream',
            {
                keys,
                ...mappedSettings,
            },
            {
                pkg: '@nivo/stream',
                defaults: StreamDefaultProps,
            }
        )

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="Stream" tags={stream.Stream.tags} />
                    <ComponentDescription description={stream.Stream.description} />
                    <ComponentTabs
                        chartClass="stream"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveStream
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            //theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="Stream"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Stream}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
