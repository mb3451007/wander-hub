
import React, { useEffect, useState } from 'react'
import styles from './TabSwitcher.module.scss'

interface TabSwitcherProps {
  selected: string
  onSwitch: (name: string) => void
  tabs: {
    name: string
    icon: JSX.Element
  }[]
}

export default function TabSwitcher(props: TabSwitcherProps) {
  const [searchRes, setSearchRes] = useState(false)

  useEffect(() => {
    if (window.location.pathname.includes('/searchResults')) {
      console.log('searchResults')
      setSearchRes(true)
    } 
  }, [])
  return (
    <div className={`${searchRes ? styles.lefAlignedTabsContiner : styles.tabSwitcher}`}>
      {props.tabs.map((tab) => (
        <div
          className={`${styles.tabSwitcher__tab} ${tab.name == props.selected ? styles['tabSwitcher__tab--active'] : ''}`}
          key={tab.name}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(_) => props.onSwitch(tab.name)}
        >
          {tab.icon} {tab.name}
        </div>
      ))}
    </div>
  )
}
