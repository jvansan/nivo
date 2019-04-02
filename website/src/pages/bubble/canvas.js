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
import range from 'lodash/range'
import random from 'lodash/random'
import { ResponsiveBubbleCanvas, BubbleCanvasDefaultProps } from '@nivo/circle-packing'
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

const NODE_COUNT = 2000

const generateData = () =>
    range(NODE_COUNT).map(i => ({
        id: `node.${i}`,
        value: random(10, 100000),
    }))

export default class BubbleCanvas extends Component {
    state = {
        settings: {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },

            pixelRatio:
                typeof window !== 'undefined' && window.devicePixelRatio
                    ? window.devicePixelRatio
                    : 1,

            identity: 'id',
            value: 'value',

            colors: 'set3',
            colorBy: 'id',
            padding: 1,
            leavesOnly: false,

            enableLabel: false,
            label: 'name',
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

        const root = {
            id: 'root',
            children: generateData(),
        }

        const mappedSettings = mapper(settings)

        const code = generateCode('ResponsiveBubbleCanvas', mappedSettings, {
            pkg: '@nivo/circle-packing',
            defaults: BubbleCanvasDefaultProps,
        })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="BubbleCanvas" tags={bubble.BubbleCanvas.tags} />
                    <ComponentDescription description={bubble.BubbleCanvas.description} />
                    <ComponentTabs
                        chartClass="circle-packing"
                        code={code}
                        data={root}
                        nodeCount={NODE_COUNT}
                        diceRoll={diceRoll}
                    >
                        <ResponsiveBubbleCanvas
                            root={cloneDeep(root)}
                            {...mappedSettings}
                            //theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="BubbleCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Bubble}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
