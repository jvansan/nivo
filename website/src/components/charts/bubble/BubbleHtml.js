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
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import { groupsByScope } from './BubbleControls'
import ComponentDescription from '../../ComponentDescription'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const description = `
Bubble chart using circle packing with zooming ability.
You can fully customize it using \`nodeComponent\` property
to define your own node component, if you wish to do so you should
have a look at [the native HTML node component](https://github.com/plouc/nivo/blob/master/src/components/charts/bubble/BubbleHtmlNode.js)
for available properties.

The responsive alternative of this component is \`ResponsiveBubbleHtml\`.
It also offers various implementations,
see [Bubble](self:/bubble) and [BubbleCanvas](self:/bubble/canvas).

You can also see more example usages in
[the storybook](storybook:bubblehtml--default).
`

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

            // labels
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

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 12,

            // interactivity
            isInteractive: true,

            // zooming
            isZoomable: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { root, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveBubbleHtml', mappedSettings, {
            pkg: '@nivo/circle-packing',
            defaults: BubbleHtmlDefaultProps,
        })

        return (
            <ChartPage>
                <ChartHeader
                    chartClass="BubbleHtml"
                    tags={['@nivo/circle-packing', 'hierarchy', 'html', 'isomorphic']}
                />
                <ComponentDescription description={description} />
                <ChartTabs chartClass="circle-packing" code={code} data={root} diceRoll={diceRoll}>
                    <ResponsiveBubbleHtml
                        root={cloneDeep(root)}
                        {...mappedSettings}
                        theme={nivoTheme}
                    />
                </ChartTabs>
                <Settings
                    component="BubbleHtml"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Bubble}
                />
            </ChartPage>
        )
    }
}
