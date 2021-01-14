export const state = function() {
    return {
        like: false
    }
}

export const mutations = {
    putLikeJob(state, like) {
        state.like = like
    }
}