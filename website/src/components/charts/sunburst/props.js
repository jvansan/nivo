/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SunburstDefaultProps as defaults } from '@nivo/sunburst'

export default [
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveSunburst&nbsp;/&gt;</code>.
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
                <code>&lt;ResponsiveSunburst&nbsp;/&gt;</code>.
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
        key: 'identity',
        description: (
            <span>
                define identity accessor, if string given, will use <code>node[value]</code>,<br />
                if function given, it will be invoked for each node and will receive the node as
                first argument, it must return the node identity (string).
            </span>
        ),
        type: '{string|Function}',
        required: false,
        default: defaults.identity,
    },
    {
        key: 'value',
        description: (
            <span>
                define value accessor, if string given, will use <code>node[value]</code>,<br />
                if function given, it will be invoked for each node and will receive the node as
                first argument, it must return the node value (number).
            </span>
        ),
        type: '{string|Function}',
        required: false,
        default: defaults.value,
    },
    {
        key: 'colors',
        description: 'Defines how to compute node color.',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        group: 'Base',
    },
    {
        key: 'colorBy',
        description:
            'Property to use to determine primary node color. If a function is provided, it will receive current node data and must return a color',
        type: '{string|Function}',
        required: false,
        default: 'id',
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'childColor',
        description: 'Defines how to compute child nodes color.',
        type: '{string|Function}',
        required: false,
        default: defaults.childColor,
        controlType: 'color',
        group: 'Base',
    },
    {
        key: 'borderWidth',
        description: 'Node border width.',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Base',
    },
    //{
    //    key: 'borderColor',
    //    description: 'Node border color.',
    //    type: '{string}',
    //    required: false,
    //    default: defaults.borderColor,
    //    controlType: 'text',
    //    group: 'Base',
    //},
    {
        key: 'cornerRadius',
        description: 'Round node shape.',
        type: '{number}',
        required: false,
        default: defaults.cornerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['Sunburst'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    // Animation not supported for now
    //{
    //    key: 'animate',
    //    description: 'Enable/disable transitions.',
    //    type: '{boolean}',
    //    required: false,
    //    default: defaults.animate,
    //    controlType: 'switch',
    //    group: 'Animation',
    //},
]
