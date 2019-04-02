/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateLibTree } from '@nivo/generators'
import Layout from '../../components/Layout'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groupsByScope } from '../../data/components/sunburst/props'
import mapper from '../../data/components/sunburst/mapper'

const data = generateLibTree()

const SunburstApi = () => {
    return (
        <Layout>
            <ApiClient
                componentName="Sunburst"
                chartClass="sunburst"
                apiPath="/charts/sunburst"
                dataProperty="data"
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    data: JSON.stringify(data, null, '  '),

                    margin: {
                        top: 20,
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
                }}
            />
        </Layout>
    )
}

export default SunburstApi
