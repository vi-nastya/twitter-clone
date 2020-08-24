import React from 'react'
import styled, { css } from 'styled-components'
import { color } from '../../helpers/color'
import { resetButton } from '../../helpers/mixins'

export type IconButtonProps = {
  children?: React.ReactChild
  disabled?: boolean
  className?: string
  type?: 'submit' | 'button' | 'reset' | undefined
} & React.HTMLAttributes<HTMLButtonElement>

const IconButton = ({
  children,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}: IconButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      type={type}
      className={className}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

const disabledButton = css`
  pointer-events: none;
  background: ${color.lightBg};
  color: ${color.white};
`
const StyledButton = styled.button<{ disabled?: boolean }>`
  ${resetButton};
  width: 30px;
  height: 30px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 15px;
  line-height: 17px;

  color: ${color.dark};
  background-color: transparent;
  border-radius: 20px;

  cursor: pointer;
  user-select: none;

  transition: background-color 0.2s;

  & svg {
    height: 15px;
    width: 15px;
    color: ${color.dark};
  }

  &,
  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${color.lightBg};
  }

  ${(props) => props.disabled && disabledButton}
`

export default IconButton
