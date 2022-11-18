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
    <div className="w-full h-full">
      {isImageError ? null : (
        <Image
          src={src}
          alt={alt}
          width={550}
          height={550}
          onError={fallback}
        />
      )}
    </div>
  )
}
export default OptimizeImage
