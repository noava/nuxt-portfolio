export const useImageStore = defineStore('images', () => {
  const supabase = useSupabaseClient()

  const images = ref<string[]>([])
  const selectedImage = ref<string | null>(null)
  const imageCache = ref<{ [key: string]: string }>({})

  // Fetch images from Supabase
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images_shown')
      .select('image_url, "order"')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching images from the database:', error)
      return []
    }

    images.value = data.map((file) => file.image_url).filter((url) => !imageCache.value[url])
  }

  fetchImages()

  const selectImage = (url: string) => {
    // Add image URL to the images array if not exsisting
    if (!images.value.includes(url)) {
      images.value.push(url)
    }

    imageCache.value[url] = url

    selectedImage.value = url
  }

  const clearSelectedImage = () => {
    selectedImage.value = null
  }

  const nextImage = () => {
    if (selectedImage.value) {
      const currentIndex = images.value.indexOf(selectedImage.value)
      const nextImageUrl = images.value[(currentIndex + 1) % images.value.length]

      imageCache.value[nextImageUrl] = nextImageUrl

      selectedImage.value = nextImageUrl
    }
  }

  const previousImage = () => {
    if (selectedImage.value) {
      const currentIndex = images.value.indexOf(selectedImage.value)
      const prevImageUrl =
        images.value[(currentIndex - 1 + images.value.length) % images.value.length]

      imageCache.value[prevImageUrl] = prevImageUrl

      selectedImage.value = prevImageUrl
    }
  }

  return {
    images,
    selectedImage,
    selectImage,
    clearSelectedImage,
    nextImage,
    previousImage
  }
})
