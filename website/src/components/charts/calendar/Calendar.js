/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import generateCode from '../../../lib/generateChartCode'
import ComponentDescription from '../../ComponentDescription'
import Settings from '../../Settings'
import { groupsByScope } from './CalendarControls'
import { ResponsiveCalendar, CalendarDefaultProps } from '@nivo/calendar'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialSettings = {
    from: '2015-03-01',
    to: '2016-07-12',

    align: 'center',
    emptyColor: '#eeeeee',
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    minValue: 0,
    maxValue: 'auto',

    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    direction: 'horizontal',

    yearSpacing: 40,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,

    monthBorderWidth: 2,
    monthBorderColor: '#ffffff',
    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    daySpacing: 0,
    dayBorderWidth: 2,
    dayBorderColor: '#ffffff',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
        },
    ],

    theme: nivoTheme,
}

const description = `
This component is heavily inspired by
[this demo](https://observablehq.com/@d3/calendar-view).

The responsive alternative of this component is \`ResponsiveCalendar\`,
it also offers a canvas implementations, see
[CalendarCanvas](self:/calendar/canvas).

See the [dedicated guide](self:/guides/legends) on how to setup
legends for this component.
`

const Calendar = ({ data }) => {
    const [settings, setSettings] = useState(initialSettings)
    const [actions, logAction] = useActionsLogger()
    const onDayClick = useCallback(
        day => {
            logAction({
                type: 'click',
                label: `[day] ${day.day}: ${day.value}`,
                data: day,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveCalendar',
        {
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/calendar',
            defaults: CalendarDefaultProps,
        }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="Calendar" tags={['@nivo/calendar', 'svg', 'isomorphic']} />
            <ComponentDescription description={description} />
            <ChartTabs chartClass="calendar" code={code} data={data}>
                <ResponsiveCalendar
                    from={settings.from}
                    to={settings.to}
                    data={data}
                    onClick={onDayClick}
                    {...mappedSettings}
                />
            </ChartTabs>
            <ActionsLogger actions={actions} isFullWidth={true} />
            <Settings
                component="Calendar"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Calendar}
            />
        </ChartPage>
    )
}

export default Calendar
