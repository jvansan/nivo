/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveTreeMap, TreeMapDefaultProps } from '@nivo/treemap'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './TreeMapControls'
import generateCode from '../../../lib/generateChartCode'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const initialSettings = {
    identity: 'name',
    value: 'loc',
    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 3,
    outerPadding: 3,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: 'loc',
    labelFormat: '.0s',
    labelSkipSize: 12,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.2,
    },
    orientLabel: true,

    colors: 'nivo',
    colorBy: 'depth',
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,
}

const TreeMap = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[cell] ${node.id}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode('ResponsiveTreeMap', mappedSettings, {
        dataKey: 'root',
        pkg: '@nivo/treemap',
        defaults: TreeMapDefaultProps,
    })

    return (
        <ChartPage>
            <ChartHeader
                chartClass="TreeMap"
                tags={['@nivo/treemap', 'hierarchy', 'svg', 'isomorphic']}
            />
            <div className="chart-description">
                <p className="description">
                    A tree map component using{' '}
                    <a
                        href="https://github.com/d3/d3-hierarchy#treemap"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        d3-hierarchy.treemap
                    </a>
                    , see{' '}
                    <a
                        href="http://bl.ocks.org/mbostock/6bbb0a7ff7686b124d80"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this block
                    </a>
                    . You can fully customize it using <code>nodeComponent</code> property to define
                    your own node component, if you wish to do so you should have a look at{' '}
                    <a
                        href="https://github.com/plouc/nivo/blob/master/src/components/charts/treemap/TreeMapNode.js"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        native SVG node component
                    </a>{' '}
                    for available properties.
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveTreeMap</code>,
                    it also offers other implementations, see{' '}
                    <Link to="/treemap/html">TreeMapHtml</Link> and{' '}
                    <Link to="/treemap/canvas">TreeMapCanvas</Link>.
                </p>
                <p className="description">
                    The <code>TreeMap</code> component is also available in the{' '}
                    <a
                        href="https://github.com/plouc/nivo-api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        nivo-api
                    </a>
                    , see{' '}
                    <a
                        href={`${config.nivoApiUrl}/samples/treemap`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/treemap/api">try it using the API client</Link>.
                </p>
            </div>
            <ChartTabs chartClass="treemap" code={code} data={data.root} diceRoll={diceRoll}>
                <ResponsiveTreeMap
                    root={data.root}
                    {...mappedSettings}
                    theme={nivoTheme}
                    onClick={onClick}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} />
            <Settings
                component="TreeMap"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.TreeMap}
            />
        </ChartPage>
    )
}

export default TreeMap
