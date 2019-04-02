/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import { ResponsiveSunburst } from '@nivo/sunburst'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import ComponentDescription from '../../ComponentDescription'
import { groupsByScope } from './SunburstControls'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const description = `
The responsive alternative of this component is
\`ResponsiveSunburst\`.
`

export default class Sunburst extends Component {
    state = {
        settings: {
            margin: {
                top: 40,
                right: 20,
                bottom: 20,
                left: 20,
            },

            identity: 'name',
            value: 'loc',

            cornerRadius: 2,

            borderWidth: 1,
            borderColor: 'white',

            colors: 'nivo',
            colorBy: 'id',
            childColor: {
                type: 'inherit',
            },

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveSunburst', mappedSettings, { pkg: '@nivo/sunburst' })

        return (
            <ChartPage>
                <ChartHeader
                    chartClass="Sunburst"
                    tags={['@nivo/sunburst', 'hierarchy', 'radial', 'svg', 'isomorphic']}
                />
                <ComponentDescription description={description} />
                <ChartTabs chartClass="sunburst" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveSunburst data={data} {...mappedSettings} theme={nivoTheme} />
                </ChartTabs>
                <Settings
                    component="Sunburst"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Sunburst}
                />
            </ChartPage>
        )
    }
}
