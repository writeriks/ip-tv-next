import React from 'react'

import { useSelector } from 'react-redux'

import ContentPanel from './content-panel/content-panel'
import SideBar from './side-bar/side-bar'

import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'

const PanelMain = () => {
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)

  return (
    <>
      {isSideBarVisible && <SideBar />}
      <ContentPanel />
    </>
  )
}

export default PanelMain
