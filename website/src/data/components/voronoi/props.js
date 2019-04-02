/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import dedent from 'dedent-js'
import { VoronoiDefaultProps as defaults } from '@nivo/voronoi'
import { getPropertiesGroupsControls } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        scopes: '*',
        description: (
            <div>
                Chart data, which must conform to this structure:
                <pre className="code code-block">
                    {dedent`
                            Array.<{
                                id: {string|number},
                                x:  {number},
                                y:  {number}
                            }>
                        `}
                </pre>
            </div>
        ),
        type: '{Object}',
        required: true,
    },
    {
        key: 'xDomain',
        scopes: '*',
        description: 'Defines the x values domain.',
        type: '{[number, number]}',
        required: false,
        default: defaults.xDomain,
    },
    {
        key: 'yDomain',
        scopes: '*',
        description: 'Defines the y values domain.',
        type: '{[number, number]}',
        required: false,
        default: defaults.yDomain,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveVoronoi&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart width.',
        type: '{number}',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveVoronoi&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart height.',
        type: '{number}',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        scopes: '*',
        description: 'Chart margin.',
        type: '{object}',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'layers',
        scopes: ['Voronoi'],
        description: (
            <div>
                Defines the order of layers, available layers are:
                <code>links</code>, <code>cells</code>, <code>points</code>, <code>bounds</code>.
                <br />
                You can also use this to insert extra layers to the chart, this extra layer must be
                a function which will receive the chart computed data and must return a valid SVG
                element.
            </div>
        ),
        required: false,
        default: defaults.layers,
    },
    {
        key: 'enableLinks',
        scopes: '*',
        description: 'Enable/disable links.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLinks,
        controlType: 'switch',
        group: 'Links',
    },
    {
        key: 'linkLineWidth',
        description: 'Links line width.',
        type: '{number}',
        required: false,
        default: defaults.linkLineWidth,
        controlType: 'lineWidth',
        group: 'Links',
    },
    {
        key: 'linkLineColor',
        description: 'Links color.',
        type: '{string}',
        required: false,
        default: defaults.linkLineColor,
        controlType: 'colorPicker',
        group: 'Links',
    },

    {
        key: 'enableCells',
        scopes: '*',
        description: 'Enable/disable cells.',
        type: '{boolean}',
        required: false,
        default: defaults.enableCells,
        controlType: 'switch',
        group: 'Cells',
    },
    {
        key: 'cellLineWidth',
        description: 'Border width for cells.',
        type: '{number}',
        required: false,
        default: defaults.cellLineWidth,
        controlType: 'lineWidth',
        group: 'Cells',
    },
    {
        key: 'cellLineColor',
        description: 'Border color for cells.',
        type: '{string}',
        required: false,
        default: defaults.cellLineColor,
        controlType: 'colorPicker',
        group: 'Cells',
    },
    {
        key: 'enablePoints',
        scopes: '*',
        description: 'Enable/disable points.',
        type: '{boolean}',
        required: false,
        default: defaults.enablePoints,
        controlType: 'switch',
        group: 'Points',
    },
    {
        key: 'pointSize',
        description: 'Size of points.',
        type: '{number}',
        required: false,
        default: defaults.siteSize,
        controlType: 'range',
        group: 'Points',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'pointColor',
        description: 'Points color.',
        type: '{string}',
        required: false,
        default: defaults.pointColor,
        controlType: 'colorPicker',
        group: 'Points',
    },
]

export const groupsByScope = {
    Voronoi: getPropertiesGroupsControls(props, 'Voronoi'),
    api: getPropertiesGroupsControls(props, 'api'),
}
