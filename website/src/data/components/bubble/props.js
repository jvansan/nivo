/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'gatsby'
import { BubbleDefaultProps as defaults } from '@nivo/circle-packing'
import {
    motionProperties,
    defsProperties,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'root',
        scopes: '*',
        description: 'The hierarchical data object.',
        type: '{Object}',
        required: true,
    },
    {
        key: 'identity',
        description: (
            <span>
                define value accessor, if string given, will use <code>datum[value]</code>,<br />
                if function given, it will be invoked for each node and will receive the node as
                first argument, it must return the node value.
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
                define value accessor, if string given, will use <code>datum[value]</code>,<br />
                if function given, it will be invoked for each node and will receive the node as
                first argument, it must return the node value.
            </span>
        ),
        type: '{string|Function}',
        required: false,
        default: 'value',
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveBubble&nbsp;/&gt;</code>.
            </span>
        ),
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
                <code>&lt;ResponsiveBubble&nbsp;/&gt;</code>.
            </span>
        ),
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
        key: 'pixelRatio',
        scopes: ['BubbleCanvas'],
        description: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        default: 'Depends on device',
        type: `{number}`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'leavesOnly',
        scopes: '*',
        description: 'Only render leaf nodes (skip parent nodes).',
        type: '{boolean}',
        required: false,
        default: defaults.leavesOnly,
        controlType: 'switch',
        group: 'Base',
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
        key: 'padding',
        scopes: '*',
        description: (
            <span>
                sets the approximate padding between adjacent circles, in pixels. see{' '}
                <a
                    href="https://github.com/d3/d3-hierarchy#pack_padding"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    official d3 documentation
                </a>
                . Please be aware that when zoomed, this value will be affected by the zooming
                factor.
            </span>
        ),
        help:
            'Padding between each circle (animated). Please be aware that when zoomed, this value will be affected by the zooming factor.',
        type: '{number}',
        required: false,
        default: defaults.padding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    /*##################################################################################################################

        Style

    ##################################################################################################################*/
    {
        key: 'colors',
        scopes: '*',
        description: (
            <span>
                colors used to colorize the circles,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Defines how to compute node color.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        description:
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color',
        type: '{string|Function}',
        required: false,
        default: 'depth',
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'depth',
                    value: 'depth',
                },
                {
                    label: 'name',
                    value: 'name',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'borderWidth',
        scopes: '*',
        description: 'Width of circle border.',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        scopes: '*',
        description: (
            <span>
                how to compute border color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.borderColor,
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...defsProperties(['Bubble']),
    {
        key: 'enableLabel',
        scopes: '*',
        description: 'Enable/disable labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        scopes: '*',
        description:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        type: '{string|Function}',
        required: false,
        default: defaults.label,
        controlType: 'choices',
        group: 'Labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id}: \${d.value}\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelFormat',
        scopes: '*',
        description: (
            <span>
                how to format label,{' '}
                <a
                    href="https://github.com/d3/d3-format/blob/master/README.md#format"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    see d3.format() documentation
                </a>
                .
            </span>
        ),
    },
    {
        key: 'labelTextColor',
        scopes: '*',
        description: (
            <span>
                how to compute label text color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute label text color.',
        type: '{string|Function}',
        required: false,
        default: defaults.labelTextColor,
        controlType: 'color',
        group: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'labelSkipRadius',
        scopes: '*',
        description: 'Skip label rendering if node radius is lower than given value, 0 to disable.',
        type: '{number}',
        required: false,
        default: defaults.labelSkipRadius,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['Bubble', 'BubbleHtml'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'isZoomable',
        scopes: ['Bubble', 'BubbleHtml'],
        description: `Enable/disable zooming ('isInteractive' must also be 'true').`,
        type: '{boolean}',
        required: false,
        default: defaults.isZoomable,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['Bubble', 'BubbleHtml'],
        description: 'onClick handler, it receives clicked node data and mouse event.',
        type: '{Function}',
        required: false,
    },
    ...motionProperties(['Bubble', 'BubbleHtml'], defaults),
]

export const groupsByScope = {
    Bubble: getPropertiesGroupsControls(props, 'Bubble'),
    BubbleHtml: getPropertiesGroupsControls(props, 'BubbleHtml'),
    BubbleCanvas: getPropertiesGroupsControls(props, 'BubbleCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
