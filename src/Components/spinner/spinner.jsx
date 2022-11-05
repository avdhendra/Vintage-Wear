import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

import React from 'react'

function Spinner() {
  return (
      <SpinnerOverlay>
          <SpinnerContainer/>
    </SpinnerOverlay>
  )
}

export default Spinner