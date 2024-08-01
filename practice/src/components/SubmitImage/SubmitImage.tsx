import { getBase64 } from '@/utils'
import { ChangeEvent, useState } from 'react'

export const SubmitImage = () => {
  const [baseSrc, setBaseSrc] = useState('')

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const file = e.target.files[0]
      const base64 = await getBase64(file)
      setBaseSrc(base64)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor='fileInput'>请选择文件</label>
        <input style={{ display: 'none' }} onChange={handleInputChange} id='fileInput' type='file' accept='image/*' />
      </div>
      <img src={baseSrc} />
    </div>
  )
}
