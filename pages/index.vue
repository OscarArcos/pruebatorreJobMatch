<template>
  <div>
    <div class="perfilTorre">
      <input v-model="perfilBuscar" type="text" />
      <button @click="buscarInfoPerfil">Buscar</button>
    </div>
    <div>
      <DragableCard></DragableCard>
      <img :src="infoBio.picture" alt="" />
      <p>{{ infoBio.name }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DragableCard from '~/components/DragableCard.vue'

export default {
  components: {
    DragableCard,
  },
  data() {
    return {
      infoBio: {},
      perfilBuscar: '',
    }
  },
  methods: {
    async buscarInfoPerfil() {
      const result = await this.$api.getProfile(this.perfilBuscar)
      this.infoBio = (await result.json()).person
    },
  },
}
</script>

<style></style>
