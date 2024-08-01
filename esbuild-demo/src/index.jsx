import React, { useState } from 'react'

function Home() {
  const [data, setData] = useState(1)
  return <div>{data}</div>
}
