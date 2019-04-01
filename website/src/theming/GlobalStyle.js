/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    html,
    body {
        font-size: 16px;
        line-height: 1.6em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
    }

    svg {
        shape-rendering: auto; /* optimizeSpeed */
    }
    
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
`
