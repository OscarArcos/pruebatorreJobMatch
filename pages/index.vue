<template>
  <div class="mainContainer">
    <div class="menuPrincipal">
      <div class="menuTitulo">
        <h2>OscArcos</h2>
        <p>Jobs Match</p>
      </div>
      <div class="menuOpciones">
        <p v-if="user != null">Swipe the cards!</p>
        <button
          v-if="user != null"
          @click="closeUser"
          class="botonMain cerrarSesion"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
    <div v-if="!ingresado" class="perfilTorre">
      <h1>Hello!</h1>
      <h2>Welcome to iTorre</h2>
      <p>(Select your option below)</p>
      <div class="perfilTorre--looking">
        <h3
          :class="
            buscoTrabajo
              ? 'perfilTorre--underline'
              : 'perfilTorre--notunderline'
          "
          @click="buscoTrabajoOption"
        >
          Are you looking for the job of your dreams?
        </h3>
        <h3
          @click="noBuscoTrabajoOption"
          :class="
            !buscoTrabajo
              ? 'perfilTorre--underline'
              : 'perfilTorre--notunderline'
          "
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Or... the best talent for your company?
        </h3>
      </div>
      <div class="inputInfo">
        <input v-model="perfilBuscar" placeholder="Usuario / ID" type="text" />
      </div>
      <button @click="buscarInfoPerfil" class="botonMain">Ingresar</button>
    </div>
    <div v-if="ingresado" class="profileSide">
      <img v-if="user != null && buscoTrabajo" :src="infoBio.picture" alt="" />
      <p v-if="user != null && buscoTrabajo" class="profileSide--name">
        {{ infoBio.name }}
      </p>
      <p v-if="user != null && buscoTrabajo" class="profileSide--carrera">
        {{ infoBio.professionalHeadline }}
      </p>
      <img
        v-if="user != null && !buscoTrabajo"
        :src="jobInfo.organizations[0].picture"
        alt=""
      />
      <p v-if="user != null && !buscoTrabajo" class="profileSide--name">
        {{ jobInfo.organizations[0].name }}
      </p>
    </div>
    <div v-if="ingresado" class="cardsSide">
      <DragableCard v-if="user != null && buscoTrabajo" />
      <DragableCardUsers v-if="user != null && !buscoTrabajo" />
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
      ingresado: false,
    }
  },
  computed: {
    ...mapState({
      user: (store) => store.user,
      buscoTrabajo: (store) => store.buscoTrabajo,
    }),
  },
  methods: {
    async buscarInfoPerfil() {
      if (this.buscoTrabajo) {
        try {
          const result = await this.$api.getProfile(this.perfilBuscar)
          this.infoBio = (await result.json()).person
          this.putUserPlaying(this.infoBio.id)
          this.ingresado = true
        } catch (error) {
          alert('Usuario no encontrado')
        }
      } else {
        try {
          const result = await this.$api.getJobsById(this.perfilBuscar)
          this.jobInfo = await result.json()
          console.log(this.jobInfo)
          this.putUserPlaying(this.perfilBuscar)
          this.ingresado = true
        } catch (error) {
          alert('Empresa no encontrada')
        }
      }
    },
    buscoTrabajoOption() {
      this.putTypePlaying(true)
      console.log(this.buscoTrabajo)
    },
    noBuscoTrabajoOption() {
      this.putTypePlaying(false)
      console.log(this.buscoTrabajo)
    },
    closeUser() {
      this.perfilBuscar = ''
      this.putUserPlaying(null)
      this.ingresado = false
    },
    ...mapMutations({
      putUserPlaying: 'putUserPlaying',
      putTypePlaying: 'putTypePlaying',
    }),
  },
}
</script>

<style lang="scss" scoped>
.mainContainer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.63);
}
.perfilTorre {
  position: absolute;
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  &--looking {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &--underline {
    color: #cddc39;
    cursor: pointer;
  }
  &--notunderline {
    cursor: pointer;
  }
  h1 {
    margin: 0;
    color: #cddc39;
  }
  h2 {
    margin: 0;
  }
  h3 {
    margin: 0;
  }
}
.inputInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    width: 15rem;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 7px;
    border: 0;
    outline: none;
    color: #000000;
    font-size: 1.2rem;
  }
  &--checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.botonMain {
  width: 15rem;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 7px;
  border: 0;
  outline: none;
  background-color: #cddc39;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    letter-spacing: 1px;
  }
}
.cerrarSesion {
  margin-right: 1rem;
}
.menuPrincipal {
  position: absolute;
  top: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.63);
  color: white;
}
.menuTitulo {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
}
.menuTitulo h2,
p {
  margin: 0 1rem;
}
.menuTitulo:hover {
  letter-spacing: 1px;
}
.menuOpciones {
  display: flex;
  justify-content: center;
  align-items: center;
}
.profileSide {
  margin-left: 5rem;
  width: 20%;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  &--name {
    font-weight: bold;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  &--carrera {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  img {
    margin: 1rem;
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 50%;
  }
}
.cardsSide {
  width: 80%;
}
</style>
