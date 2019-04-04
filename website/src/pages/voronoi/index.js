/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import range from 'lodash/range'
import { ResponsiveVoronoi, VoronoiDefaultProps } from '@nivo/voronoi'
import { useTheme } from '../../theming/context'
import SEO from '../../components/seo'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
// import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
// import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/voronoi/meta.yml'
import { groupsByScope } from '../../data/components/voronoi/props'

const xDomain = [0, 100]
const yDomain = [0, 100]

const generateData = () =>
    range(100).map(id => ({ id, x: Math.random() * xDomain[1], y: Math.random() * yDomain[1] }))

const initialSettings = {
    ...ResponsiveVoronoi.defaultProps,

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
}

const VoronoiPage = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])

    const code = generateCode('ResponsiveVoronoi', settings, {
        pkg: '@nivo/voronoi',
        defaults: VoronoiDefaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="Voronoi" keywords={meta.Voronoi.tags} />
            <ComponentHeader chartClass="Voronoi" tags={meta.Voronoi.tags} />
            <ComponentDescription description={meta.Voronoi.description} />
            <ComponentTabs chartClass="voronoi" code={code} data={data} diceRoll={diceRoll}>
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
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="Voronoi"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Voronoi}
            />
        </ComponentPage>
    )
}

export default VoronoiPage
