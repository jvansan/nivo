/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import shuffle from 'lodash/shuffle'
import { ResponsiveBullet, BulletDefaultProps } from '@nivo/bullet'
import { generateBulletData } from '@nivo/generators'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import bullet from '../../data/components/bullet/meta.yml'
import { groupsByScope } from '../../data/components/bullet/props'
// import nivoTheme from '../../../nivoTheme'

const generateData = () => [
    generateBulletData('temp.', shuffle([100, 120, 140])[0]),
    generateBulletData('power', 2, { float: true, measureCount: 2 }),
    generateBulletData('volume', shuffle([40, 60, 80])[0], { rangeCount: 8 }),
    generateBulletData('cost', 500000, { measureCount: 2 }),
    generateBulletData('revenue', shuffle([9, 11, 13])[0], { markerCount: 2 }),
]

const initialSettings = {
    margin: {
        top: 50,
        right: 90,
        bottom: 50,
        left: 90,
    },
    layout: BulletDefaultProps.layout,
    reverse: BulletDefaultProps.reverse,
    spacing: 46,
    titlePosition: BulletDefaultProps.titlePosition,
    titleAlign: 'start',
    titleOffsetX: -70,
    titleOffsetY: BulletDefaultProps.titleOffsetY,
    titleRotation: BulletDefaultProps.titleRotation,
    measureSize: 0.2,
    markerSize: 0.6,
    axisPosition: BulletDefaultProps.axisPosition,
    rangeColors: BulletDefaultProps.rangeColors,
    measureColors: BulletDefaultProps.measureColors,
    markerColors: BulletDefaultProps.markerColors,
    animate: true,
    motionStiffness: 90,
    motionDamping: 12,
    //theme: nivoTheme,
}

const Bullet = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const [actions, logAction] = useActionsLogger()
    const onRangeClick = useCallback(
        range => {
            logAction({
                type: 'click',
                label: `[range] ${range.id}: [${range.v0}, ${range.v1}]`,
                data: range,
            })
        },
        [logAction]
    )
    const onMeasureClick = useCallback(
        measure => {
            logAction({
                type: 'click',
                label: `[measure] ${measure.id}: [${measure.v0}, ${measure.v1}]`,
                data: measure,
            })
        },
        [logAction]
    )
    const onMarkerClick = useCallback(
        marker => {
            logAction({
                type: 'click',
                label: `[marker] ${marker.id}: ${marker.value}`,
                data: marker,
            })
        },
        [logAction]
    )
    const diceRoll = useCallback(() => setData(generateData()), [setData])

    const code = generateCode('ResponsiveBullet', settings, {
        pkg: '@nivo/bullet',
        defaults: BulletDefaultProps,
    })

    return (
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="Bullet" tags={bullet.Bullet.tags} />
                <ComponentDescription description={bullet.Bullet.description} />
                <ComponentTabs chartClass="bullet" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveBullet
                        data={data}
                        {...settings}
                        onRangeClick={onRangeClick}
                        onMeasureClick={onMeasureClick}
                        onMarkerClick={onMarkerClick}
                    />
                </ComponentTabs>
                <ActionsLogger actions={actions} />
                <ComponentSettings
                    component="Bullet"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.Bullet}
                />
                <Stories stories={bullet.Bullet.stories} />
            </ComponentPage>
        </Layout>
    )
}

export default Bullet
