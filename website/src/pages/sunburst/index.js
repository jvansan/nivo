/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
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
import meta from '../../data/components/sunburst/meta.yml'
import mapper from '../../data/components/sunburst/mapper'
import { groupsByScope } from '../../data/components/sunburst/props'

const initialSettings = {
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
}

const Sunburst = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLibTree())
    const diceRoll = useCallback(() => setData(generateLibTree()), [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveSunburst', mappedSettings, { pkg: '@nivo/sunburst' })

    return (
        <ComponentPage>
            <SEO title="Sunburst" keywords={meta.Sunburst.tags} />
            <ComponentHeader chartClass="Sunburst" tags={meta.Sunburst.tags} />
            <ComponentDescription description={meta.Sunburst.description} />
            <ComponentTabs chartClass="sunburst" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveSunburst data={data} {...mappedSettings} theme={theme.nivo} />
            </ComponentTabs>
            <ComponentSettings
                component="Sunburst"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Sunburst}
            />
        </ComponentPage>
    )
}

export default Sunburst
