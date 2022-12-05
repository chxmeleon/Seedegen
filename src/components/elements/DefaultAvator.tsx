import React from 'react'

export const defaultAvator = () => {
  const avator = [...new Array(5)].map((item, idx) => {
    
    return (
      <div key={idx}>DefaultAvator</div>
    )
  }
  )
}

