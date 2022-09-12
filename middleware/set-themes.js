import useThemes from '~/composables/useThemes'

export default function ({ store, $vuetify }) {
  const themes = useThemes()
  let getTheme = store.getters['themes/selected']
  if (_.isEmpty(getTheme)) {
    store.commit('themes/setSelected', themes[0])
    getTheme = store.getters['themes/selected']
  }
  Object.keys(getTheme.light).forEach((key) => {
    $vuetify.theme.themes.light[key] = getTheme.light[key]
  })
  Object.keys(getTheme.dark).forEach((key) => {
    $vuetify.theme.themes.dark[key] = getTheme.dark[key]
  })
}
