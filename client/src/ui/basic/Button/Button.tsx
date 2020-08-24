import React from 'react'
import styled, { css } from 'styled-components'
import { color } from '../../helpers/color'
import { resetButton } from '../../helpers/mixins'

export type ButtonProps = {
  text: string
  ghost?: boolean
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset' | undefined
} & React.HTMLAttributes<HTMLButtonElement>

const Button = ({
  text,
  ghost = false,
  disabled = false,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton ghost={ghost} disabled={disabled} {...rest} type={type}>
      {text}
    </StyledButton>
  )
}

const ghostButton = css`
  color: ${color.dark};
  background-color: transparent;
  border: 2px solid ${color.border};

  &:hover {
    border-color: ${color.brand};
    background-color: transparent;
  }
`

const disabledButton = css`
  pointer-events: none;
  background: ${color.lightBg};
  color: ${color.white};
`

const StyledButton = styled.button<{ ghost: boolean; disabled?: boolean }>`
  ${resetButton}
  width: 200px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 15px;
  line-height: 17px;

  color: ${color.white};
  background-color: ${color.brand};
  border-radius: 20px;

  cursor: pointer;
  user-select: none;

  transition: border-color 0.25s, background-color 0.25s;

  &,
  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${color.brandHover};
  }

  ${(props) => props.ghost && ghostButton}

  ${(props) => props.disabled && disabledButton}

  @media (max-width: 345px) {
    max-width: 100%;
    &:hover {
      transform: scaleY(1.035);
    }
  }
`

export default Button
