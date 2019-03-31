/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import snakeCase from 'lodash/kebabCase'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VisitIcon from 'react-icons/lib/md/keyboard-arrow-right'
import config from '../config'
import CollapsibleCard from './CollapsibleCard'

const buildStoryLink = ({ kind, story }) =>
    `${config.storybookUrl}?path=/story/${encodeURIComponent(
        kind.toLowerCase()
    )}--${encodeURIComponent(snakeCase(story))}`

const Wrapper = styled.div`
    position: fixed;
    bottom: ${({ theme }) => theme.dimensions.contentMargin}px;
    --innerHeight: calc(100% - 70px - ${({ theme }) => theme.dimensions.contentMargin}px);
    height: calc(var(--innerHeight) * 0.45);
    background: ${({ theme }) => theme.colors.cardAltBackground};
    ${({ isFullWidth, theme }) => {
        if (isFullWidth) {
            return `
                --innerWidth: calc(100% - ${theme.dimensions.miniNavWidth +
                    theme.dimensions.contentMargin * 2}px);
                --halfWidth: calc(var(--innerWidth) * 0.6);    
                width: calc(var(--halfWidth) - ${theme.dimensions.contentMargin / 2}px);
                right: ${theme.dimensions.contentMargin}px;
            `
        }

        return `
            --innerWidth: calc(100% - ${theme.dimensions.miniNavWidth +
                theme.dimensions.contentMargin * 2}px);
            --halfWidth: calc(var(--innerWidth) * 0.6);    
            --fullWidth: calc(var(--halfWidth) - ${theme.dimensions.contentMargin / 2}px);
            --computedWidth: calc(var(--fullWidth) / 2);
            right: calc(${theme.dimensions.contentMargin}px + var(--computedWidth));
            width: var(--computedWidth);    
        `
    }}
    z-index: 10;
    overflow: hidden;

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            --innerHeight: calc(
                100% - ${({ theme }) => 70 + theme.dimensions.contentMarginSmall}px
            );
            height: calc(var(--innerHeight) * 0.45);
            bottom: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
            ${({ isFullWidth, theme }) => {
                if (isFullWidth) {
                    return `
                        right: ${theme.dimensions.contentMarginSmall}px;
                        --innerWidth: calc(100% - ${theme.dimensions.contentMarginSmall * 2}px);
                        --halfWidth: calc(var(--innerWidth) * 0.6);
                        width: calc(var(--halfWidth) - ${theme.dimensions.contentMarginSmall /
                            2}px);
                    `
                }

                return `
                    --innerWidth: calc(100% - ${theme.dimensions.contentMarginSmall * 2}px);
                    --halfWidth: calc(var(--innerWidth) * 0.6);
                    --fullWidth: calc(var(--halfWidth) - ${theme.dimensions.contentMarginSmall /
                        2}px);
                    --computedWidth: calc(var(--fullWidth) / 2);
                    right: calc(${theme.dimensions.contentMarginSmall}px + var(--computedWidth));
                    width: var(--computedWidth);
                `
            }}
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            position: relative;
            bottom: auto;
            right: auto;
            width: auto;
            height: auto;
            box-shadow: ${({ theme }) => theme.cardShadow};
        }
    }
`

const StoriesItem = styled.a`
    color: inherit;
    padding: 9px 24px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
    font-size: 14px;
    line-height: 1.6em;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

const Stories = ({ isFullWidth = false, stories }) => {
    return (
        <Wrapper isFullWidth={isFullWidth}>
            <CollapsibleCard title="Recipes" expandedByDefault={true}>
                {stories.map((story, i) => (
                    <StoriesItem
                        key={i}
                        href={buildStoryLink(story.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {story.label}
                        <VisitIcon size={20} color="#bbb" />
                    </StoriesItem>
                ))}
            </CollapsibleCard>
        </Wrapper>
    )
}

Stories.propTypes = {
    isFullWidth: PropTypes.bool,
    stories: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.shape({
                kind: PropTypes.string.isRequired,
                story: PropTypes.string.isRequired,
            }).isRequired,
        })
    ),
}

export default Stories
