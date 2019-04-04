/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'
//import dedent from 'dedent-js'
//import Markdown from '../Markdown'

export default styled.span`
    font-size: 13px;
    line-height: 1.6em;
    color: ${({ theme }) => theme.colors.textLight};
`

const More = styled.span`
    cursor: pointer;
    display: inline-block;
    margin-left: 9px;
    color: ${({ theme }) => theme.colors.link};

    &:hover {
        text-decoration: underline;
    }
`

const Less = styled.span`
    cursor: pointer;
    display: inline-block;
    color: ${({ theme }) => theme.colors.link};

    &:hover {
        text-decoration: underline;
    }
`

const Description = styled.div`
    grid-column-start: 2;
    line-height: 1.6em;

    p {
        margin: 7px 0;
    }
    p:first-child {
        margin-top: 0;
    }
`

// const PropertyHelp = ({ help }) => {
//     const [isOpened, setIsOpened] = useState(false)
//     const hasDescription = description !== undefined

//     return (
//         <>
//             {!isOpened && (
//                 <Help>{help}
//                 </Help>
//             )}
//             {hasDescription && isOpened && (
//                 <>
//                     <Description>
//                         <Markdown source={dedent(description)} />
//                         <Less onClick={() => setIsOpened(false)}>less</Less>
//                     </Description>
//                 </>
//             )}
//         </>
//     )
// }

// PropertyHelp.propTypes = {
//     help: PropTypes.string.isRequired,
//     description: PropTypes.string,
// }

// export default PropertyHelp
