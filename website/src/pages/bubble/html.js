/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { ResponsiveBubbleHtml, BubbleHtmlDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ComponentSettings from '../../components/components/ComponentSettings'
import generateCode from '../../lib/generateChartCode'
import bubble from '../../data/components/bubble/meta.yml'
import mapper from '../../data/components/bubble/mapper'
import { groupsByScope } from '../../data/components/bubble/props'
// import nivoTheme from '../../../nivoTheme'

const root = generateLibTree()

export default class BubbleHtml extends Component {
    state = {
        settings: {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            identity: 'name',
            value: 'loc',
            colors: 'paired',
            colorBy: 'depth',
            padding: 1,
            leavesOnly: false,

            enableLabel: true,
            label: 'id',
            labelSkipRadius: 10,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 0.8,
            },

            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 0.3,
            },

            animate: true,
            motionStiffness: 90,
            motionDamping: 12,

            isInteractive: true,

            isZoomable: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode('ResponsiveBubbleHtml', mappedSettings, {
            pkg: '@nivo/circle-packing',
            defaults: BubbleHtmlDefaultProps,
        })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="BubbleHtml" tags={bubble.BubbleHtml.tags} />
                    <ComponentDescription description={bubble.BubbleHtml.description} />
                    <ComponentTabs
                        chartClass="circle-packing"
                        code={code}
                        data={root}
                        diceRoll={diceRoll}
                    >
                        <ResponsiveBubbleHtml
                            root={cloneDeep(root)}
                            {...mappedSettings}
                            //theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="BubbleHtml"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Bubble}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
