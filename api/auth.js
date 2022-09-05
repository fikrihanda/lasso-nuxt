export default {
  async login (data) {
    return await this.$axios.$post('auth/login', data)
  }
}
