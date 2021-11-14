function lastPartURL(url) {
  const parts = url.split("/")
  return parts.pop() || parts.pop()
}

export function changeImageSource(image, server) {
  let originalSource = image.src
  let imagePath = lastPartURL(originalSource)
  image.src = `${server}/${imagePath}`
  return image
}
