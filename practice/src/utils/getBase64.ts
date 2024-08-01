export const getBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      }
    }

    reader.onerror = () => reject(file.name)

    reader.readAsDataURL(file)
  })
