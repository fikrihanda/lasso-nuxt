// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ encodingType: 'aes', isCompression: true })

export default function ({ store }) {
  new VuexPersistence({
    key: 'lasso',
    saveState: (key, state) => ls.set(key, state),
    restoreState: key => ls.get(key),
    reducer: state => ({
      authorization: state.authorization,
      themes: state.themes
    })
  }).plugin(store)
}
