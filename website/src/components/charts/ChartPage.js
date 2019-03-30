/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'

const ChartPage = styled.div`
    padding-left: ${({ theme }) => theme.dimensions.contentMargin}px;
    margin-right: calc(60% + ${({ theme }) => theme.dimensions.contentMargin / 2}px);

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            padding-left: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            margin-right: calc(60% + ${({ theme }) => theme.dimensions.contentMarginSmall / 2}px);
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            padding: 0;
            margin: 0 ${({ theme }) => theme.dimensions.contentMarginSmall}px;
        }
    }
`

export default ChartPage
