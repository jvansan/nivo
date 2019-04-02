/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveCalendar, CalendarDefaultProps } from '@nivo/calendar'
import { generateDayCounts } from '@nivo/generators'
import Layout from '../../components/Layout'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import generateCode from '../../lib/generateChartCode'
import calendar from '../../data/components/calendar/meta.yml'
import mapper from '../../data/components/calendar/mapper'
import { groupsByScope } from '../../data/components/calendar/props'
// import nivoTheme from '../../../nivoTheme'

const Tooltip = data => {
    /* return custom tooltip */
}

const from = new Date(2015, 3, 1)
const to = new Date(2018, 7, 12)
const generateData = () => generateDayCounts(from, to)

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

    // theme: nivoTheme,
}

const Calendar = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
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

    const mappedSettings = mapper(settings)

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
        <Layout>
            <ComponentPage>
                <ComponentHeader chartClass="Calendar" tags={calendar.Calendar.tags} />
                <ComponentDescription description={calendar.Calendar.description} />
                <ComponentTabs chartClass="calendar" code={code} data={data} diceRoll={diceRoll}>
                    <ResponsiveCalendar
                        from={settings.from}
                        to={settings.to}
                        data={data}
                        onClick={onDayClick}
                        {...mappedSettings}
                    />
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={true} />
                <ComponentSettings
                    component="Calendar"
                    settings={settings}
                    onChange={setSettings}
                    groups={groupsByScope.Calendar}
                />
            </ComponentPage>
        </Layout>
    )
}

export default Calendar
