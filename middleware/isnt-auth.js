export default function ({ store, redirect }) {
  const token = store.getters['authorization/token']
  if (!_.isEmpty(token)) {
    return redirect('/')
  }
}
