import React from 'react'
import styled, { css } from 'styled-components'
import { color } from '../../helpers/color'
import { resetButton, resetInput } from '../../helpers/mixins'

export type ButtonProps = {
  /*placeholder?: string*/
  /*value: string
   */
  name: string
  className?: string
  multiline?: boolean
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = ({
  placeholder = '',
  value = '',
  disabled = false,
  className = '',
  multiline = false,
  name,
  ...rest
}: ButtonProps) => {
  return (
    <StyledInput className={className}>
      {multiline ? (
        // @ts-ignore
        <textarea disabled={disabled} name={name} {...rest} />
      ) : (
        <input disabled={disabled} name={name} {...rest} />
      )}
    </StyledInput>
  )
}

const StyledInput = styled.div`
  width: 400px;
  min-height: 40px;
  box-sizing: border-box;

  & input,
  & textarea {
    ${resetInput};

    width: 100%;
    height: 100%;

    border: 2px solid ${color.border};

    border-radius: 8px;
    padding: 8px 16px;

    font: inherit;

    transition: border-color 0.25s;

    &:focus,
    &:hover {
      border: 2px solid ${color.brand};
    }
  }
`

export default Input
