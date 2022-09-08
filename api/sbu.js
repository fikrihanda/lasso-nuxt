export default {
  async getRegional (payload) {
    try {
      const res = await this.$axios.$post('sbu/combo/box/lihat', payload)
      if (!res.success) {
        return Promise.reject(new Error(res.message))
      }
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async getOffice (payload) {
    try {
      const res = await this.$axios.$post('sbu/kp/combo/box/lihat', payload)
      if (!res.success) {
        return Promise.reject(new Error(res.message))
      }
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
