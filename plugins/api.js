const files = require.context('~/api', false, /\.js$/)
const api = {}

files.keys().forEach((fileName) => {
  if (fileName === './index.js') {
    return
  }
  const name = (() => {
    const fileNameArray = fileName.replace(/(\.\/|\.js)/g, '').split('-')
    return fileNameArray.map((n, i) => {
      if (i > 0) {
        return _.capitalize(n)
      }
      return n
    }).join('')
  })()
  api[name] = files(fileName).default
})

export default function (ctx, inject) {
  Object.keys(api).forEach((key) => {
    api[key].$axios = ctx.$axios
  })
  ctx.$api = api
  inject('api', api)
}
