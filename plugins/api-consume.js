export default (context, inject) => {
    inject('api', api)
    context.$api = api
}

const api = {
    getProfile(profile) {
        return fetch('https://rest-api-back-torre.herokuapp.com/api/bio/' + profile)
    }
}