/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import MiniNavLink from './MiniNavLink'
import { getSectionItems } from '../../SiteMap'

const miniNavItems = getSectionItems('Components').map((item, i) => {
    return { ...item, index: i }
})

class MiniNav extends Component {
    render() {
        return (
            <aside className="mini-nav">
                {miniNavItems.map(item => {
                    return (
                        <MiniNavLink
                            key={item.path}
                            style={{}}
                            {...item}
                        />
                    )
                })}
            </aside>
        )
    }
}

export default MiniNav
