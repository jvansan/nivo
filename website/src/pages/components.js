/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import SEO from '../components/seo'
import ComponentsExplorer from '../components/components/explorer/ComponentsExplorer'

const Components = props => {
    return (
        <>
            <SEO title="Components" />
            <ComponentsExplorer location={props.location} navigate={props.navigate} />
        </>
    )
}

export default Components
