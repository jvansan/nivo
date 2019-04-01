/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import ComponentsIcon from 'react-icons/lib/md/widgets'
import GuidesIcon from 'react-icons/lib/md/book'
import ExtrasIcon from 'react-icons/lib/md/more-vert'
import MobileNavComponents from './MobileNavComponents'
import MobileNavGuides from './MobileNavGuides'
import MobileNavExtras from './MobileNavExtras'

const Tabs = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 64px;
    width: 100%;
    background: #e25d47;
    color: white;
    z-index: 3001;
    display: none;

    @media only screen and (max-width: 760px) {
        & {
            display: flex;
        }
    }
`

const TabsItem = styled.div`
    height: 64px;
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const TabsItemIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: transparent;
    color: white;
    position: relative;
    font-size: 28px;
    line-height: 1em;
`

const TabsItemLabel = styled.span`
    white-space: pre;
    font-size: 12px;
    display: block;
    line-height: 1em;
    margin-top: 7px;
`

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 64px;
    left: 0;
    z-index: 3000;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
`

const MobileNav = () => {
    const [currentTab, setCurrentTab] = useState(null)
    const setTab = useCallback(
        tab => {
            setCurrentTab(current => {
                if (current === tab) setCurrentTab(null)
                else setCurrentTab(tab)
            })
        },
        [setCurrentTab]
    )
    const close = useCallback(() => setCurrentTab(null), [setCurrentTab])

    return (
        <>
            <Tabs>
                <TabsItem onClick={() => setTab('components')}>
                    <TabsItemIcon>
                        <ComponentsIcon />
                    </TabsItemIcon>
                    <TabsItemLabel>components</TabsItemLabel>
                </TabsItem>
                <TabsItem onClick={() => setTab('guides')}>
                    <TabsItemIcon>
                        <GuidesIcon />
                    </TabsItemIcon>
                    <TabsItemLabel>Guides</TabsItemLabel>
                </TabsItem>
                <TabsItem onClick={() => setTab('extras')}>
                    <TabsItemIcon>
                        <ExtrasIcon />
                    </TabsItemIcon>
                    <TabsItemLabel>Other</TabsItemLabel>
                </TabsItem>
            </Tabs>
            {currentTab !== null && (
                <Container>
                    {/*currentTab === 'components' && <MobileNavComponents close={this.close} />*/}
                    {currentTab === 'guides' && <MobileNavGuides close={close} />}
                    {currentTab === 'extras' && <MobileNavExtras close={close} />}
                </Container>
            )}
        </>
    )
}

export default MobileNav
