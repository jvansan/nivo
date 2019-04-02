/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Layout from '../../components/Layout'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groupsByScope } from '../../data/components/treemap/props'
import mapper from '../../data/components/treemap/mapper'
import { generateLightDataSet } from '../../data/components/treemap/generator'

const data = generateLightDataSet()

const TreeMapApi = () => {
    return (
        <Layout>
            <ApiClient
                componentName="TreeMap"
                chartClass="treemap"
                apiPath="/charts/treemap"
                dataProperty="root"
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    root: JSON.stringify(data, null, '  '),
                    tile: 'squarify',
                    leavesOnly: false,

                    width: 600,
                    height: 450,
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },

                    enableLabels: true,
                    labelSkipSize: 0,
                    label: 'loc',
                    labelFormat: '.0s',
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 0.6,
                    },
                    orientLabels: true,

                    innerPadding: 3,
                    outerPadding: 3,

                    colors: 'nivo',
                    colorBy: 'depth',

                    borderWidth: 1,
                    borderColor: {
                        type: 'inherit:darker',
                        gamma: 0.3,
                    },
                    identity: 'name',
                    value: 'loc',
                }}
            />
        </Layout>
    )
}

export default TreeMapApi
