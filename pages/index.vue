<template>
  <div>
    <div class="perfilTorre">
      <input v-model="perfilBuscar" type="text" />
      <button>Buscar</button>
    </div>
    <div>
      <DragableCard></DragableCard>
      <!--- <img :src="infoBio.person.picture" alt="" /> -->
      <!--- <p>{{ infoBio.person.name }}</p> --->
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
      perfilBuscar: 'torrenegra',
    }
  },
  methods: {
    /*buscarInfoPerfil() {
      axios
        .get('http://localhost:4000/api/bio/' + this.perfilBuscar)
        .then((res) => {
          this.infoBio = res.data
        })
      console.log(this.infoBio)
    },*/
  },
}
</script>

<style></style>
