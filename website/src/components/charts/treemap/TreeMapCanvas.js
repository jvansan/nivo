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
import { ResponsiveTreeMapCanvas, TreeMapCanvasDefaultProps } from '@nivo/treemap'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import generateCode from '../../../lib/generateChartCode'
import config from '../../../config'
import Settings from '../../Settings'
import { groupsByScope } from './TreeMapControls'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import { generateHeavyDataSet } from './generators'
import ChartPage from '../ChartPage'

const initialSettings = {
    tile: 'squarify',
    leavesOnly: true,
    innerPadding: 1,
    outerPadding: 0,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    enableLabel: true,
    labelFormat: '.0s',
    labelSkipSize: 18,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.6,
    },
    orientLabel: true,

    colors: 'paired',
    colorBy: 'id',
    borderWidth: 1,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    isInteractive: true,
}

const TreeMapCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateHeavyDataSet())
    const diceRoll = useCallback(() => setData(generateHeavyDataSet()), [setData])
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

    const code = generateCode('ResponsiveTreeMapCanvas', mappedSettings, {
        dataKey: 'root',
        pkg: '@nivo/treemap',
        defaults: TreeMapCanvasDefaultProps,
    })

    return (
        <ChartPage>
            <ChartHeader
                chartClass="TreeMapCanvas"
                tags={['@nivo/treemap', 'hierarchy', 'canvas']}
            />
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/treemap">TreeMap</Link> component. Well suited
                    for large data sets as it does not impact DOM tree depth and does not involve
                    React diffing stuff (not that useful when using canvas), however you'll lose the
                    isomorphic ability and transitions (for now).
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveTreeMapCanvas</code>, it also offers other implementations, see{' '}
                    <Link to="/treemap">TreeMap</Link> and{' '}
                    <Link to="/treemap/html">TreeMapHtml</Link>.
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
            <ChartTabs
                chartClass="treemap"
                code={code}
                data={data.root}
                diceRoll={diceRoll}
                nodeCount={data.nodeCount}
            >
                <ResponsiveTreeMapCanvas
                    root={data.root}
                    {...mappedSettings}
                    theme={nivoTheme}
                    onClick={onClick}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} />
            <Settings
                component="TreeMapCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.TreeMapCanvas}
            />
        </ChartPage>
    )
}

export default TreeMapCanvas
