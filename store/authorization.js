import useParseJwt from '~/composables/useParseJwt'

const initState = {
  token: '',
  info: {},
  menus: {
    backoffice: [],
    mobile: []
  },
  regionals: ''
}

export const state = () => initState

export const getters = {
  token: state => state.token,
  info: state => state.info,
  menusBackoffice: state => state.menus.backoffice,
  menusMobile: state => state.menus.mobile,
  regionals: (state) => {
    const regionals = state.regionals
    if (_.isEmpty(regionals)) { return [] }
    const splitRow = regionals.split('@@')
    return splitRow.reduce((prev, cur, index) => {
      const dataRow = cur.split('##')
      const dataKpRow = dataRow[2].split('^^')
      const dataKp = dataKpRow.reduce((prevKP, curKp) => {
        const splitKp = curKp.split('%%')
        prevKP.push({
          idKp: splitKp[0],
          namaKp: splitKp[1].replace('amp;', ''),
          status: splitKp[2]
        })
        return prevKP
      }, [])
      prev.push({
        idSbu: dataRow[0],
        namaSbu: dataRow[1],
        dataKp
      })
      return prev
    }, [])
  }
}

export const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  setInfo (state, payload) {
    state.info = payload
  },
  setMenusBackoffice (state, payload) {
    state.menus.backoffice = payload
  },
  setMenusMobile (state, payload) {
    state.menus.mobile = payload
  },
  setRegionals (state, payload) {
    state.regionals = payload
  }
}

export const actions = {
  async loginGoogle ({ commit }, data) {
    const { credential = '' } = data
    if (_.isEmpty(credential)) { return Promise.reject(new Error('Salah Token')) }
    const { email = '' } = useParseJwt(credential)
    if (_.isEmpty(email)) { return Promise.reject(new Error('Salah Token')) }

    try {
      const res = await this.$axios.$post('auth/login', {
        email,
        password: 'password',
        loginBy: '2'
      })
      if (!res.success) { return Promise.reject(new Error(res.message)) }
      const { data: { menu, menuMobile, pengguna, sbuKP, token } } = res
      commit('setToken', token)
      commit('setMenusBackoffice', menu)
      commit('setMenusMobile', menuMobile)
      commit('setInfo', pengguna)
      commit('setRegionals', sbuKP)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async login ({ commit }, data) {
    try {
      const res = await this.$axios.$post('auth/login', {
        ...data,
        loginBy: '1'
      })
      if (!res.success) { return Promise.reject(new Error(res.message)) }
      const { data: { menu, menuMobile, pengguna, sbuKP, token } } = res
      commit('setToken', token)
      commit('setMenusBackoffice', menu)
      commit('setMenusMobile', menuMobile)
      commit('setInfo', pengguna)
      commit('setRegionals', sbuKP)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
