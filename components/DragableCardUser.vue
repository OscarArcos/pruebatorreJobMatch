<template>
  <section class="container">
    <div
      v-if="current"
      class="fixed fixed--center"
      style="z-index: 3"
      :class="{ transition: isVisible }"
    >
      <Vue2InteractDraggable
        v-if="isVisible"
        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        :interact-event-bus-events="interactEventBus"
        interact-block-drag-down
        @draggedRight="emitAndNext('match')"
        @draggedLeft="emitAndNext('reject')"
        @draggedUp="emitAndNext('skip')"
        class="rounded-borders card card--one"
      >
        <div style="height: 100%" class="card--info">
          <img :src="current.picture" class="rounded-borders" />
          <div class="card--company">
            <p class="card__name">{{ current.name }}</p>
            <p class="card__objective">{{ current.professionalHeadline }}</p>
            <div class="card--infoRight">
              <p>{{ current.skills[0].name }}</p>
              <p>{{ current.skills[1].name }}</p>
              <p>{{ current.skills[2].name }}</p>
            </div>
          </div>
        </div>
      </Vue2InteractDraggable>
    </div>
    <div
      v-if="next"
      class="rounded-borders card card--two fixed fixed--center"
      style="z-index: 2"
    >
      <div style="height: 100%" class="card--info">
        <img :src="next.picture" class="rounded-borders" />
        <div class="card--company">
          <p class="card__name">{{ next.name }}</p>
          <p class="card__objective">{{ next.professionalHeadline }}</p>
          <div class="card--infoRight">
            <p>{{ next.skills[0].name }}</p>
            <p>{{ next.skills[1].name }}</p>
            <p>{{ next.skills[2].name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="index + 2 < infoBios.length"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1"
    >
      <div style="height: 100%" class="card--info"></div>
    </div>
    <div class="footer fixed">
      <div class="btn btn--decline" @click="reject">
        <img src="~/assets/nope.png" alt="Logo" class="logosAbajo" />
      </div>
      <div class="btn btn--skip" @click="skip">
        <img src="~/assets/super-like.png" alt="Logo" class="logosAbajo" />
      </div>
      <div class="btn btn--like" @click="match">
        <img src="~/assets/like.png" alt="Logo" class="logosAbajo" />
      </div>
    </div>
  </section>
</template>
<script>
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
import { mapState, mapMutations } from 'vuex'
import gql from 'graphql-tag'

const CREATE_LIKE = gql`
  mutation createLikes($quien: String!, $aquien: String!) {
    createLikes(quien: $quien, aquien: $aquien)
  }
`

const EVENTS = {
  MATCH: 'match',
  SKIP: 'skip',
  REJECT: 'reject',
}
export default {
  name: 'SwipeableCards',
  components: { Vue2InteractDraggable },
  data() {
    return {
      isVisible: true,
      index: 0,
      interactEventBus: {
        draggedRight: EVENTS.MATCH,
        draggedLeft: EVENTS.REJECT,
        draggedUp: EVENTS.SKIP,
      },
      infoBios: [],
    }
  },
  async created() {
    const result = await this.$api.getBios()
    this.infoBios = (await result.json()).results
    console.log(this.infoBios)
  },
  computed: {
    current() {
      return this.infoBios[this.index]
    },
    next() {
      return this.infoBios[this.index + 1]
    },
    nextThree() {
      return this.infoBios[this.index + 2]
    },
    ...mapState({
      user: (store) => store.user,
    }),
  },
  methods: {
    match() {
      InteractEventBus.$emit(EVENTS.MATCH)
    },
    reject() {
      InteractEventBus.$emit(EVENTS.REJECT)
    },
    skip() {
      InteractEventBus.$emit(EVENTS.SKIP)
    },
    async emitAndNext(event) {
      if (event === 'match') {
        const result = await this.$api.getProfile(this.current.username)
        const idUser = (await result.json()).person.id
        console.log('Like', this.index, this.user, idUser)
        await this.$apollo.mutate({
          mutation: CREATE_LIKE,
          variables: {
            quien: this.user,
            aquien: idUser, // this should be the same name as the one the server is expecting
          },
        })
      } else if (event === 'reject') {
        console.log('NoLike', this.index, this.current.id)
      } else {
        console.log('Skip', this.index)
      }
      this.$emit(event, this.index)
      setTimeout(() => (this.isVisible = false), 200)
      setTimeout(() => {
        this.index++
        this.isVisible = true
      }, 200)
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  background: #eceff1;
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 60vh;
  z-index: 0;
  top: 0;
  left: 0;
  color: white;
  text-align: center;
  font-style: italic;
  font-family: 'Engagement', cursive;
  background: #f953c6;
  background: -webkit-linear-gradient(to top, #b91d73, #f953c6);
  background: linear-gradient(to top, #b91d73, #f953c6);
  clip-path: polygon(0 1%, 100% 0%, 100% 76%, 0 89%);
  display: flex;
  justify-content: space-between;
  span {
    display: block;
    font-size: 4rem;
    padding-top: 2rem;
    text-shadow: 1px 1px 1px red;
  }
  i {
    padding: 24px;
  }
}
.footer {
  width: 50%;
  bottom: 0;
  left: 70%;
  transform: translateX(-50%);
  display: flex;
  padding-bottom: 30px;
  justify-content: space-around;
  align-items: center;
}
.btn {
  position: relative;
  width: 50px;
  height: 50px;
  padding: 0.2rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.02),
    0 10px 14px 1px rgba(0, 0, 0, 0.02), 0 4px 18px 3px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: translateY(4px);
  }
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: '';
    }
  }
  &--like {
    padding: 0.5rem;
    color: white;
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
    i {
      font-size: 32px;
    }
  }
}
.flex {
  display: flex;
  &--center {
    align-items: center;
    justify-content: center;
  }
}
.fixed {
  position: fixed;
  &--center {
    left: 70%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.rounded-borders {
  border-radius: 15px;
}

.card {
  width: 40vh;
  height: 60vh;
  background-color: white;
  color: white;
  box-shadow: 0 3px 6px #00000025;
  &__objective {
    font-size: 1.2rem;
    padding: 0 1rem;
    margin: 0;
    color: #cddc39;
    font-weight: bold;
  }
  &__name {
    margin-top: 1.3rem;
    font-size: 0.8rem;
    color: #00000080;
  }
  &--infoRight {
    border: 2px solid #cddc39;
    border-radius: 10px;
    margin: 1rem;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #00000080;
    p {
      margin: 0.5rem 0;
    }
  }
  &--info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }
  &--company {
    color: black;
  }
  img {
    object-fit: cover;
    width: 10rem;
    height: 10rem;
    margin-top: 5rem;
  }
  &--one {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
  &--two {
    transform: translate(-48%, -48%);
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
  }
  &--three {
    transform: translate(-46%, -46%);
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
  }
  .text {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: black;
    background: rgba(0, 0, 0, 0.5);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    text-indent: 20px;
    span {
      font-weight: normal;
    }
  }
}
.transition {
  animation: appear 200ms ease-in;
}
@keyframes appear {
  from {
    transform: translate(-48%, -48%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}
.logosAbajo {
  width: 100%;
  height: 100%;
}
</style>
