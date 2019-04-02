/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import omit from 'lodash/omit'
import Layout from '../../components/Layout'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groupsByScope } from '../../data/components/line/props'
import mapper from '../../data/components/line/mapper'
import defaultSettings from '../../data/components/line/defaults'
import { generateData } from '../../data/components/line/generator'

const data = generateData()

const LineApi = () => {
    return (
        <Layout>
            <ApiClient
                componentName="Line"
                apiPath="/charts/line"
                chartClass="line"
                dataProperty="data"
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    ...omit(defaultSettings, [
                        'animate',
                        'motionDamping',
                        'motionStiffness',
                        'isInteractive',
                        'enableStackTooltip',
                    ]),
                    data: JSON.stringify(data, null, '  '),
                }}
            />
        </Layout>
    )
}

export default LineApi
