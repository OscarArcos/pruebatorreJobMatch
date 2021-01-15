export const state = function () {
  return {
    user: null,
    buscoTrabajo: true,
  }
}

export const mutations = {
  putUserPlaying(state, user) {
    state.user = user
  },
  putTypePlaying(state, buscoTrabajo) {
    state.buscoTrabajo = buscoTrabajo
  },
}
