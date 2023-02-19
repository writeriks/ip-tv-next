import { HamburgerIcon } from '@chakra-ui/icons'
import React from 'react'

type HamburgerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ ...props }) => {
  return (
    <button {...props}>
      <HamburgerIcon boxSize={6} />
    </button>
  )
}

export default HamburgerButton
