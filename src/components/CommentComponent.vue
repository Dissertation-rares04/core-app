<template>
  <q-card class="q-mt-md post" v-if="comment">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="comment.avatar || getRandomAvatar()">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label> {{ comment.userId }} </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label> {{ date.formatDate(comment.createdAt, 'YYYY MMM ddd') }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <template v-if="editMode">
        <div @blur="editMode = false">
          <q-editor v-model="newContent" label="Content"/>
        </div>
      </template>
      <template v-else>
        <span v-html="newContent"></span>
      </template>
    </q-card-section>

    <q-card-actions>
      <q-btn color="accent" icon="favorite" :label="comment.likes.length" @click="like()" :disable="!canLike"></q-btn>
      <q-space/>
      <q-btn v-if="canEditComment && !editMode" color="info" icon="edit" label="Edit" @click="editMode = true"></q-btn>
      <q-btn v-if="canEditComment && editMode" color="info" icon="save" label="Save" @click="updateComment()"></q-btn>
      <q-btn v-if="canDeleteComment" color="warning" icon="delete" label="Delete" @click="deleteComment()"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { API_ROUTES } from 'src/utils/api_routes'
import { getRandomAvatar } from 'src/utils/avatar'

export default {
  name: 'CommentComponent',
  data () {
    return {
      date,
      getRandomAvatar,
      editMode: false,
      newContent: null
    }
  },
  props: {
    comment: Object
  },
  computed: {
    canEditComment () {
      return this.comment.userId === this.$auth0.user.value.sub
    },
    canDeleteComment () {
      return this.comment.userId === this.$auth0.user.value.sub
    },
    canLike () {
      return !this.comment.likes.some(x => x.userId === this.$auth0.user.value.sub)
    }
  },
  methods: {
    async like () {
      try {
        await this.$api.post(`${API_ROUTES.COMMENT_LIKE}?commentId=${this.comment.id}`)
        this.$notify.success()
      }
      catch {
        this.$notify.fail()
      }
    },
    async updateComment () {
      if(this.newContent !== this.comment.content) {
        try {
          await this.$api.put(`${API_ROUTES.COMMENT_UPDATE}`, { id: this.comment.id, content: this.newContent })
          this.$notify.success()
        }
        catch {
          this.$notify.fail()
        }
      }
      this.editMode = false
    },
    async deleteComment () {
      try {
        const { data } = await this.$api.delete(`${API_ROUTES.COMMENT_DELETE}?commentId=${this.comment.id}`)
        if(data) {
          this.$notify.success()
          this.$emit('comment-delete', this.comment.id)
        }
        else {
          this.$notify.fail()
        }
      }
      catch {
        this.$notify.fail()
      }
    }
  },
  mounted () {
    this.newContent = this.comment.content
  }
}
</script>
