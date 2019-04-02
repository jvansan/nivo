/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'

const ComponentPage = styled.div`
    margin-right: 60%;

    &:after {
        content: ' ';
        position: fixed;
        top: ${({ theme }) => theme.dimensions.headerHeight}px;
        box-shadow: ${({ theme }) => theme.cardShadow};
        right: 0;
        bottom: 0;
        --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
        width: calc(var(--innerWidth) * 0.6);
        background: rgba(0, 0, 0, 0);
    }

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            margin-right: 60%;
            &:after {
                width: 60%;
            }
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            margin: 0;
            &:after {
                display: none;
            }
        }
    }
`

export default ComponentPage
