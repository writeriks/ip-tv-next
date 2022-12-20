import React, { useCallback, useState } from 'react'

import { CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'

import { debounce } from 'lodash'

import uiReducerSelector from '../../../store/reducers/ui-reducer/ui-reducer-selector'
import contextReducerSelector from '../../../store/reducers/context-reducer/constext-reducer-selector'

import { setIsSideBarVisible } from '../../../store/reducers/ui-reducer/ui-slice'
import { setSearchText } from '../../../store/reducers/context-reducer/context-slice'

import styles from '../../../styles/ContentPanel.module.scss'

const ContentPanelHeader = () => {
  const dispatch = useDispatch()
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)

  const [localSearchText, setLocalSearchText] = useState('')

  const debouncedSearch = debounce((text) => {
    dispatch(setSearchText(text))
  }, 300)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setLocalSearchText(event.target.value)
      debouncedSearch(event.target.value)
    },
    [debouncedSearch]
  )

  const clearSearchText = () => {
    setLocalSearchText('')
    debouncedSearch('')
  }

  return (
    <div className={styles.contentTitleContainer}>
      {!isSideBarVisible && (
        <button className={styles.unHideSideBarButton} onClick={() => dispatch(setIsSideBarVisible(!isSideBarVisible))}>
          <HamburgerIcon boxSize={6} />
        </button>
      )}
      <div className={styles.title}>{selectedTitle}</div>
      <div className={styles.searchContainer}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">{<SearchIcon color="gray.300" />}</InputLeftElement>
          <Input placeholder="Search" focusBorderColor="#404186" value={localSearchText} onChange={onChange} />
          {localSearchText && (
            <InputRightElement onClick={() => clearSearchText()}>
              <CloseIcon boxSize={2} color="gray.300" />
            </InputRightElement>
          )}
        </InputGroup>
      </div>
    </div>
  )
}

export default ContentPanelHeader
