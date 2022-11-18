import Image from 'next/image'
import React, { useState } from 'react'

type ImageProps = {
  src: string
  alt: string
}

const OptimizeImage = (props: ImageProps) => {
  const { src, alt } = props
  const [isImageError, setIsImageError] = useState(false)
  const fallback = () => setIsImageError(true)

  return (
    <>
      {isImageError ? null : (
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          onError={fallback}
        />
      )}
    </>
  )
}
export default OptimizeImage
