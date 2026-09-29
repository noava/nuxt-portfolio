export const useImageStore = defineStore('images', () => {
  const images = ref<string[]>([])
  const selectedImage = ref("")
  
  const useImageViewer = (urls: string[]) => {
    images.value = urls
    selectedImage.value = urls[0] ?? ""
  }

  const clearSelectedImage = () => {
    selectedImage.value = ""
  }

  const nextImage = () => {
    if (selectedImage.value && images.value.length > 0) {
      const currentIndex = images.value.indexOf(selectedImage.value)
      const nextImageUrl = images.value[(currentIndex + 1) % images.value.length]
      selectedImage.value = nextImageUrl ?? ""
    }
  }

  const previousImage = () => {
    if (selectedImage.value && images.value.length > 0) {
      const currentIndex = images.value.indexOf(selectedImage.value)
      const prevImageUrl =
        images.value[(currentIndex - 1 + images.value.length) % images.value.length]
      selectedImage.value = prevImageUrl ?? ""
    }
  }

  return {
    images,
    selectedImage,
    useImageViewer,
    clearSelectedImage,
    nextImage,
    previousImage
  }
})
