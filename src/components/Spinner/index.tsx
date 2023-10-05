'use client'

import { ThreeDots } from "react-loader-spinner"

export const Spinner = () => {
  return (
    <>
      <ThreeDots
        height={'80'}
        width={'80'}
        ariaLabel={'Common Loader'}
        color={'#ffffff'}
        wrapperStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        visible={true}
        radius={'9'}
      />
    </>
  )
}