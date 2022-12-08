import Image from 'next/image'
import React, { useState } from 'react'
import nftPlaceholder from '../../../public/nft-placeholder.svg'

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
      {isImageError ? (
        <div className="flex">
          <div className="m-auto p-10 bg-slate-900 w-[550px] h-[550px] flex justify-center  rounded-xl">
            <Image
              {...nftPlaceholder}
              alt="nft placeholder"
              width={400}
              height={400}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Image
            src={src}
            alt={alt}
            width={550}
            height={550}
            onError={fallback}
          />
        </div>
      )}
    </div>
  )
}
export default OptimizeImage
