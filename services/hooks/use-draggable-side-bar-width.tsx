import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSideBarWidth } from '../../store/reducers/ui-reducer/ui-slice'

const useDraggableSideBarWidth = (isDragging: boolean, isMobile: boolean, setIsDragging: Dispatch<SetStateAction<boolean>>): number => {
  const SIDEBAR_WIDTH_MOBILE = 250
  const MIN_SIDEBAR_WIDTH = 250
  const MAX_SIDEBAR_WIDTH_PERCENTAGE = 0.3

  const dispatch = useDispatch()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      const maxSiderWidth = window.innerWidth * MAX_SIDEBAR_WIDTH_PERCENTAGE

      if (isDragging) {
        const cursorXPos = event.clientX
        if (cursorXPos > maxSiderWidth) {
          setWidth(maxSiderWidth)
        } else if (cursorXPos < MIN_SIDEBAR_WIDTH) {
          setWidth(MIN_SIDEBAR_WIDTH)
        } else {
          setWidth(cursorXPos)
        }
      }
    }

    const handleMouseUp = (): void => {
      setIsDragging(false)
      dispatch(setSideBarWidth(width || MIN_SIDEBAR_WIDTH))
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })
  return isMobile ? SIDEBAR_WIDTH_MOBILE : width
}

export default useDraggableSideBarWidth
