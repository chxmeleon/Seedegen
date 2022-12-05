import { useRouter } from 'next/router'
import React from 'react'

export default function Footer() {
  const router = useRouter()

  return (
    <>
      {router.route === '/search' ? null : (
        <div className="p-3 pb-11 text-center">ICU</div>
      )}
    </>
  )
}
