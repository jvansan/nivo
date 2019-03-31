/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PointerIcon from 'react-icons/lib/fa/hand-pointer-o'

export const useActionsLogger = () => {
    const [actions, setActions] = useState([])
    const logAction = useCallback(
        action => {
            setActions(actions => {
                return [action, ...actions]
            })
        },
        [setActions]
    )

    return [actions, logAction]
}

const Wrapper = styled.div`
    position: fixed;
    right: ${({ theme }) => theme.dimensions.contentMargin}px;
    bottom: ${({ theme }) => theme.dimensions.contentMargin}px;
    --innerWidth: calc(
        100% -
            ${({ theme }) => theme.dimensions.contentMargin * 2 + theme.dimensions.miniNavWidth}px
    );
    --halfWidth: calc(var(--innerWidth) * 0.6);
    --fullWidth: calc(var(--halfWidth) - ${({ theme }) => theme.dimensions.contentMargin / 2}px);
    --computedWidth: calc(var(--fullWidth) / 2);
    width: var(--computedWidth);
    background: ${({ theme }) => theme.colors.cardAltBackground};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    --innerHeight: calc(100% - ${({ theme }) => 70 + theme.dimensions.contentMargin}px);
    height: calc(var(--innerHeight) * 0.45);
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
    //font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    //font-size: 13px;
    //line-height: 1.4em;
    //padding: 20px;
    //white-space: pre;

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            right: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            bottom: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.contentMarginSmall * 2}px);
            --halfWidth: calc(var(--innerWidth) * 0.6);
            --fullWidth: calc(
                var(--halfWidth) - ${({ theme }) => theme.dimensions.contentMarginSmall / 2}px
            );
            --computedWidth: calc(var(--fullWidth) / 2);
            width: var(--computedWidth);
            --innerHeight: calc(
                100% - ${({ theme }) => 70 + theme.dimensions.contentMarginSmall}px
            );
            height: calc(var(--innerHeight) * 0.45);
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            position: relative;
            right: auto;
            bottom: auto;
            width: auto;
            height: 320px;
            box-shadow: ${({ theme }) => theme.cardShadow};
        }
    }
`

const EmptyContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 0.4;
    padding: 20px;
`

const EmptyMessage = styled.div`
    text-align: center;
    margin-top: 16px;
`

const EmptyIcon = styled(PointerIcon)``

const ActionContainer = styled.div`
    font-size: 13px;
`

const ActionHeader = styled.div`
    padding: 7px 12px;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`

const Action = ({ action }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ActionContainer>
            <ActionHeader>
                {action.type}: {action.label}
            </ActionHeader>
            {isOpen && <pre>{JSON.stringify(action.data, null, '  ')}</pre>}
        </ActionContainer>
    )
}

const ActionsLogger = ({ actions }) => {
    return (
        <Wrapper>
            {actions.length === 0 && (
                <EmptyContainer>
                    <EmptyIcon size={32} />
                    <EmptyMessage>Start interacting with the chart to log actions</EmptyMessage>
                </EmptyContainer>
            )}
            {actions.map((action, i) => {
                return <Action key={`${i}.${action.type}.${action.label}`} action={action} />
            })}
        </Wrapper>
    )
}

export default ActionsLogger
