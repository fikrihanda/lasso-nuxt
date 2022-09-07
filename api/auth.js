export default {
  async login (data) {
    try {
      const res = await this.$axios.$post('auth/login', data)
      if (!res.success) {
        return Promise.reject(new Error(res.message))
      }
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
