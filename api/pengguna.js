export default {
  async lihatLog () {
    try {
      const res = await this.$axios.$post('pengguna/lihat-log')
      if (!res.success) {
        return Promise.reject(new Error(res.message))
      }
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
