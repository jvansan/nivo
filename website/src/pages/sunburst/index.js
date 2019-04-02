/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import sunburst from '../../data/components/sunburst/meta.yml'
import mapper from '../../data/components/sunburst/mapper'
import { groupsByScope } from '../../data/components/sunburst/props'
//import nivoTheme from '../../../nivoTheme'

export default class Sunburst extends Component {
    state = {
        data: generateLibTree(),
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

    diceRoll = () => {
        this.setState({ data: generateLibTree() })
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = mapper(settings)

        const code = generateCode('ResponsiveSunburst', mappedSettings, { pkg: '@nivo/sunburst' })

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader chartClass="Sunburst" tags={sunburst.Sunburst.tags} />
                    <ComponentDescription description={sunburst.Sunburst.description} />
                    <ComponentTabs
                        chartClass="sunburst"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveSunburst
                            data={data}
                            {...mappedSettings}
                            // theme={nivoTheme}
                        />
                    </ComponentTabs>
                    <ComponentSettings
                        component="Sunburst"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                        groups={groupsByScope.Sunburst}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}
