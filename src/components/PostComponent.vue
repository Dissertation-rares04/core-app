<template>
  <q-card class="q-mt-md post">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="post.avatar || getRandomAvatar()">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label> {{ post.title }} </q-item-label>
        <q-item-label caption> {{ post.category }} - {{ date.formatDate(post.createdAt, 'YYYY MMM ddd') }} </q-item-label>
      </q-item-section>

      <q-space/>
      <q-item-section class="absolute-right q-pr-md">
        <q-item-label> {{ post.userId }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <span v-html="post.content"></span>
    </q-card-section>

    <q-carousel
      v-if="post.medias && post.medias.length > 0"
      class="q-pa-md"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >
      <q-carousel-slide v-for="(media, index) in post.medias" :key="index" :name="index" :img-src="media.value" />
    </q-carousel>

    <q-card-actions>
      <q-btn color="accent" icon="favorite" :label="post.likes.length" @click="like()" :disable="!canLike"></q-btn>
      <q-space/>
      <q-btn v-if="canEditPost" color="info" icon="edit" label="Edit"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { API_ROUTES } from 'src/utils/api_routes'
import { getRandomAvatar } from 'src/utils/avatar'

export default {
  name: 'PostPreviewComponent',
  data () {
    return {
      date,
      getRandomAvatar,
      slide: 1
    }
  },
  props: {
    post: Object
  },
  methods: {
    async like () {
      try {
        await this.$api.post(`${API_ROUTES.POST_LIKE}?postId=${this.post.id}`)
        this.$notify.success()
      }
      catch {
        this.$notify.fail()
      }
    },
  },
  computed: {
    canEditPost () {
      return this.$auth0.user.value.sub === this.post.userId
    },
    canLike () {
      return !this.post.likes.some(x => x.userId === this.$auth0.user.value.sub)
    }
  }
}
</script>

<style lang="sass" scoped>
.post
  width: 60vw
  height: 100%
</style>
