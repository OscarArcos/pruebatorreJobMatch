<template>
  <div>
    <div class="perfilTorre">
      <input v-model="perfilBuscar" type="text" />
      <div v-if="user == null">
        <p>Busco Trabajo</p>
        <input type="checkbox" v-model="selected" />
      </div>
      <button v-if="user == null" @click="buscarInfoPerfil">Buscar</button>
      <button v-if="user != null" @click="closeUser">Cerrar Sesión</button>
      <p>{{ user }}</p>
    </div>
    <div>
      <DragableCard v-if="user != null && selected" />
      <DragableCardUsers v-if="user != null && !selected" />
      <img v-if="user != null && selected" :src="infoBio.picture" alt="" />
      <p v-if="user != null && selected">{{ infoBio.name }}</p>
      <img
        v-if="user != null && !selected"
        :src="jobInfo.organizations[0].picture"
        alt=""
      />
      <p v-if="user != null && !selected">
        {{ jobInfo.organizations[0].name }}
      </p>
    </div>
  </div>
</template>

<script>
import DragableCard from '~/components/DragableCard.vue'
import DragableCardUsers from '~/components/DragableCardUser.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    DragableCard,
    DragableCardUsers,
  },
  data() {
    return {
      infoBio: {},
      perfilBuscar: '',
      jobInfo: {},
    }
  },
  computed: {
    ...mapState({
      user: (store) => store.user,
    }),
    selected: {
      get() {
        //getting the 0-index element of the array, assuming this checkbox is the 0th
        return this.$store.state.buscoTrabajo
      },
      set(value) {
        return this.$store.commit('putTypePlaying', value)
      },
    },
  },
  methods: {
    async buscarInfoPerfil() {
      if (this.selected) {
        try {
          const result = await this.$api.getProfile(this.perfilBuscar)
          this.infoBio = (await result.json()).person
          this.putUserPlaying(this.infoBio.id)
        } catch (error) {
          alert('Usuario no encontrado')
        }
      } else {
        try {
          const result = await this.$api.getJobsById(this.perfilBuscar)
          this.jobInfo = await result.json()
          console.log(this.jobInfo)
          this.putUserPlaying(this.perfilBuscar)
        } catch (error) {
          alert('Empresa no encontrada')
        }
      }
    },
    closeUser() {
      this.perfilBuscar = ''
      this.putUserPlaying(null)
    },
    ...mapMutations({
      putUserPlaying: 'putUserPlaying',
    }),
  },
}
</script>

<style></style>
