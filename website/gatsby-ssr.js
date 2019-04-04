/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
    return (
        <Layout>
            {element}
        </Layout>
    )
}