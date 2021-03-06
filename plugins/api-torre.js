export default (context, inject) => {
  inject('api', api)
  context.$api = api
}

const api = {
  getProfile(profile) {
    return fetch('https://rest-api-back-torre.herokuapp.com/api/bio/' + profile)
  },
  getJobs() {
    return fetch('https://rest-api-back-torre.herokuapp.com/api/jobs/')
  },
  getBios() {
    return fetch('https://rest-api-back-torre.herokuapp.com/api/bio/')
  },
  getJobsById(jobid) {
    return fetch('https://rest-api-back-torre.herokuapp.com/api/jobs/' + jobid)
  },
}
