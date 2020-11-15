module.exports =
{
  productsImages: async (files) => {
    const
      mimetype = ['image/jpeg']
    const maxSize = 1000000
    const keys = []

    await files.map(iterator => {
      iterator.mimetype == mimetype.map(iterator => iterator) && iterator.size < maxSize ? keys.push(true) : keys.push(false)
    })

    return keys.every((key) => { return Boolean(key) })
  }
}
