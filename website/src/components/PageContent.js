/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'

export default styled.div`
    margin: 0 50px;
    position: relative;

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            margin: 0 30px;
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            margin: 0 15px;
        }
    }
`
