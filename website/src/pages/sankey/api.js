/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateSankeyData } from '@nivo/generators'
import Layout from '../../components/Layout'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groupsByScope } from '../../data/components/sankey/props'
import mapper from '../../data/components/sankey/mapper'

const data = generateSankeyData({ nodeCount: 6, maxIterations: 8 })

const SankeyApi = () => {
    return (
        <Layout>
            <ApiClient
                componentName="Sankey"
                chartClass="sankey"
                apiPath="/charts/sankey"
                dataProperty="data"
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    width: 1200,
                    height: 800,
                    data: JSON.stringify(data, null, '  '),
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },

                    align: 'justify',
                    colors: 'paired',

                    nodeOpacity: 0.75,
                    nodeWidth: 18,
                    nodePaddingX: 4,
                    nodePaddingY: 12,
                    nodeBorderWidth: 0,
                    nodeBorderColor: {
                        type: 'inherit:darker',
                        gamma: 0.4,
                    },

                    linkOpacity: 0.15,
                    // @todo: not yet supported by the API
                    // linkBlendMode: 'multiply',
                    // enableLinkGradient: true,
                    linkContract: 0,

                    enableLabels: true,
                    labelPosition: 'inside',
                    labelOrientation: 'vertical',
                    labelPadding: 16,
                    labelTextColor: {
                        type: 'inherit:darker',
                        gamma: 0.8,
                    },
                }}
            />
        </Layout>
    )
}

export default SankeyApi
