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

    code, .code {
        color: ${({ theme }) => theme.colors.codeText};
    }

    a {
        color: ${({ theme }) => theme.colors.link};
        text-decoration: underline;
    }
    a code {
        color: ${({ theme }) => theme.colors.link};
    }
    
    h1 {
        font-size: 32px;
        margin: 0 0 20px 0;
        padding: 0;
        font-weight: 300;
    }
    h2, h3, h4, h5, h6 {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.titleText};
    }
    h3 {
        font-size: 16px;
    }

    p {
        margin: 15px 0;
    }
    p:first-child {
        margin-top: 0;
    }
`
