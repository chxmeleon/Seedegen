import React from 'react'
import { useRouter } from 'next/router'

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
