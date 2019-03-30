/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import shuffle from 'lodash/shuffle'
import { ResponsiveBullet, BulletDefaultProps } from '@nivo/bullet'
import { generateBulletData } from '@nivo/generators'
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Settings from '../../Settings'
import { groupsByScope } from './BulletControls'
import Stories from '../../Stories'
import { bulletStories } from './stories'
import generateCode from '../../../lib/generateChartCode'
import ChartPage from '../ChartPage'

const generateData = () => [
    generateBulletData('temp.', shuffle([100, 120, 140])[0]),
    generateBulletData('power', 2, { float: true, measureCount: 2 }),
    generateBulletData('volume', shuffle([40, 60, 80])[0], { rangeCount: 8 }),
    generateBulletData('cost', 500000, { measureCount: 2 }),
    generateBulletData('revenue', shuffle([9, 11, 13])[0], { markerCount: 2 }),
]

export default class Bullet extends Component {
    state = {
        data: generateData(),
        settings: {
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
            theme: nivoTheme,
        },
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleRangeClick = (range, event) => {
        alert(
            `'${range.id}' range clicked\nat x: ${event.clientX}, y: ${event.clientY}\nindex: ${
                range.index
            }\nv0: ${range.v0}, v1: ${range.v1}\ncolor: ${range.color}`
        )
    }

    handleMeasureClick = (measure, event) => {
        alert(
            `'${measure.id}' measure clicked\nat x: ${event.clientX}, y: ${event.clientY}\nindex: ${
                measure.index
            }\nv0: ${measure.v0}, v1: ${measure.v1}\ncolor: ${measure.color}`
        )
    }

    handleMarkerClick = (marker, event) => {
        alert(
            `'${marker.id}' marker clicked\nat x: ${event.clientX}, y: ${event.clientY}\nindex: ${
                marker.index
            }\nvalue: ${marker.value}\ncolor: ${marker.color}`
        )
    }

    render() {
        const { data, settings } = this.state

        const code = generateCode('ResponsiveBullet', settings, {
            pkg: '@nivo/bullet',
            defaults: BulletDefaultProps,
        })

        return (
            <ChartPage>
                <ChartHeader chartClass="Bullet" tags={['@nivo/bullet', 'svg', 'isomorphic']} />
                <div className="chart-description">
                    <p className="description">
                        Bullet chart supporting multiple ranges/measures/markers.
                        {/*Many properties can be overridden for a specific item using <code>overrides</code> property.*/}
                    </p>
                    <p className="description">
                        You can fully customize this chart using custom components via{' '}
                        <code>rangeComponent</code>, <code>measureComponent</code> and{' '}
                        <code>markerComponent</code> properties.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>ResponsiveBullet</code>.
                    </p>
                </div>
                <ChartTabs chartClass="bullet" code={code} data={data} diceRoll={this.diceRoll}>
                    <ResponsiveBullet
                        data={data}
                        {...settings}
                        onRangeClick={this.handleRangeClick}
                        onMeasureClick={this.handleMeasureClick}
                        onMarkerClick={this.handleMarkerClick}
                    />
                </ChartTabs>
                <Settings
                    component="Bullet"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.Bullet}
                />
                <Stories stories={bulletStories} isFullWidth={true} />
            </ChartPage>
        )
    }
}
