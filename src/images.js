function lastPartURL(url) {
  const parts = url.split("/")
  return parts.pop() || parts.pop()
}

function firstPartURL(url) {
  const parts = url.split("/")
  return parts[0]
}

export function changeImageSource(image, server) {
  let originalSource = image.src
  let imagePath = lastPartURL(originalSource)
  let firstPart = firstPartURL(originalSource)
  console.log(firstPart)
  if (!firstPart.includes("http")) {
    image.src = `${server}/${imagePath}`
  }
  return image
}
