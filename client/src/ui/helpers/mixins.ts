import { css } from 'styled-components'

export const resetList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const resetButton = css`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: inherit;
`

export const resetInput = css`
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export const resetInputWrapper = css`
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  border-radius: 0;
`

export const backgroundImage = (image1x: string, image2x: string) => {
  return `
    background-image: url('${image1x}');

    @media (min-resolution: 144dpi), (min-resolution: 1.5dppx) {
      background-image: url('${image2x}');
    }
  `
}
