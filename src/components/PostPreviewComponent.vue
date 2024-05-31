<template>
  <q-card v-ripple class="q-mt-md post-preview cursor-pointer q-hoverable" @click="redirectToPostPage()">
    <span class="q-focus-helper"></span>
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
    </q-item>

    <q-card-section>
      <span class="ellipsis-3-lines" v-html="post.content"></span>
    </q-card-section>

    <img :src="post.img">

    <q-card-actions>
      <q-btn color="accent" icon="favorite" :label="post.likes.length" @click.stop="like()" :disable="!canLike"></q-btn>
      <q-btn id='comment_btn' color="primary" icon="mode_comment" label="Comment" @click.stop="redirectToPostPage()"></q-btn>
      <q-space/>
      <q-btn v-if="canEditPost" color="info" icon="edit" label="Edit" @click.stop="redirectToEditPostPage()"></q-btn>
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
      getRandomAvatar
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
    redirectToPostPage () {
      this.$router.push(`/post/${this.post.id}`)
    },
    redirectToEditPostPage () {
      this.$router.push(`/edit-post/${this.post.id}`)
    }
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
.post-preview
  width: 60vw
  height: 100%
</style>
