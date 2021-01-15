export const state = function () {
  return {
    user: null,
    buscoTrabajo: true,
    quien: '',
    aquien: '',
  }
}

export const mutations = {
  putUserPlaying(state, user) {
    state.user = user
  },
  putTypePlaying(state, buscoTrabajo) {
    state.buscoTrabajo = buscoTrabajo
  },
  putQuien(state, quien) {
    state.quien = quien
  },
  putAquien(state, aquien) {
    state.aquien = aquien
  },
}
