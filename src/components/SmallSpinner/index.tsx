'use client'

import { ThreeDots } from "react-loader-spinner"

export const SmallSpinner = () => {
  return (
    <>
      <ThreeDots
        height={'30'}
        width={'30'}
        ariaLabel={'Common Loader'}
        color={'#ffffff'}
        wrapperStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        visible={true}
        radius={'9'}
      />
    </>
  )
}