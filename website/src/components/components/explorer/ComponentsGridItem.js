/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class ComponentsGridItem extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.name !== this.props.name
    }

    render() {
        const { path, name, icon, tags } = this.props

        return (
            <Link to={path} className="components__grid__item">
                <span className={`components__grid__item__icon sprite-icons-${icon}-red`} />
                <div className="components__grid__item__header">
                    <span className="components__grid__item__name">{name}</span>
                    {tags.length > 0 && (
                        <div className="components__grid__item__tags">
                            {tags.map(tag => (
                                <span key={tag} className="components__grid__item__tags__item">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        )
    }
}
