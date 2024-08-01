import { useState } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
  env: 'my-antd-pro-app-3gwfhhbh5d89c22a',
})

function getBase64(img: RcFile | undefined, callback: (result: any) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img as Blob)
}

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }

  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export default function Avatar() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const handleChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      app
        .uploadFile({
          cloudPath: './avator',
          filePath: info.file.originFileObj,
          onUploadProgress: function (progressEvent: any) {
            console.log(progressEvent)
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          },
        })
        .then((result) => {
          // 上传结果
          console.log(result)
        })
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }
  return (
    <Upload
      name='avatar'
      listType='picture-card'
      className='avatar-uploader'
      showUploadList={false}
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      beforeUpload={beforeUpload}
      onChange={(info) => handleChange(info)}
    >
      {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}
