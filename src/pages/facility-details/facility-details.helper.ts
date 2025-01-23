export const getImageAsBlob = async (imagePath: string): Promise<Blob> => {
  const response = await fetch(imagePath)
  return await response.blob()
}

export const convertBlobToBase64 = async (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.readAsDataURL(blob)
  })
