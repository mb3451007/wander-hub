'use client'

import React, { useEffect, useState } from 'react'
import TabSwitcher from './tabSwitcher/TabSwitcher'

import styles from './Tabbed.module.scss'

interface Tab {
  name: string
  tab: JSX.Element
  icon: JSX.Element
}

interface TabbedProps {
  tabs: Tab[]
  shared?: JSX.Element
}

export default function Tabbed(tabbedProps: TabbedProps) {
  const [selectedTab, setSelectedTab] = useState(tabbedProps.tabs[0].name)
  const [searchRes, setSearchRes] = useState(false)

  useEffect(() => {
    if (window.location.pathname.includes('/searchResults')) {
      console.log('searchResults')
      setSearchRes(true)
    } 
  }, [])

  return (
    <div className={styles.tabsContainer}>
      <TabSwitcher
        tabs={tabbedProps.tabs}
        selected={selectedTab}
        onSwitch={setSelectedTab}
      />

      {!searchRes && (
        <>
          {tabbedProps.tabs
            .filter((tab) => tab.name === selectedTab)
            .map((tab) => tab.tab)}

          {tabbedProps.shared && tabbedProps.shared}
        </>
      )}

    </div>
  )
}
