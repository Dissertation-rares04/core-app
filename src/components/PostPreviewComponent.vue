<template>
  <q-card
    v-if="postCopy"
    v-ripple
    class="q-mt-md post-preview cursor-pointer q-hoverable"
    @click="redirectToPostPage()"
  >
    <span class="q-focus-helper"></span>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="postCopy.avatar || getRandomAvatar()" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label> {{ postCopy.title }} </q-item-label>
        <q-item-label caption>
          {{ postCopy.category }} -
          {{ date.formatDate(postCopy.createdAt, "YYYY MMM ddd") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <span class="ellipsis-3-lines" v-html="postCopy.content"></span>
    </q-card-section>

    <img :src="postCopy.img" />

    <q-card-actions>
      <q-btn flat color="red-14" @click.stop="like()">
        <template #default>
          <template v-if="canLike">
            <q-icon name="favorite_border"></q-icon>
          </template>
          <template v-else>
            <q-icon name="favorite"></q-icon>
          </template>
          <span class="q-ml-sm">{{ postCopy.likes.length }}</span>
        </template>
      </q-btn>
      <q-separator vertical inset />
      <q-btn
        flat
        id="comment_btn"
        color="primary"
        icon="chat_bubble_outline"
        label="Comment"
        @click.stop="redirectToPostPage()"
      ></q-btn>
      <q-space />
      <q-btn
        v-if="canEditPost"
        flat
        color="primary"
        icon="edit"
        label="Edit"
        @click.stop="redirectToEditPostPage()"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { date, extend } from "quasar";
import { API_ROUTES } from "src/utils/api_routes";
import { getRandomAvatar } from "src/utils/avatar";

export default {
  name: "PostPreviewComponent",
  data() {
    return {
      date,
      getRandomAvatar,
      postCopy: null,
    };
  },
  props: {
    post: Object,
  },
  methods: {
    async like() {
      if (!this.canLike) return;
      try {
        this.postCopy.likes.push({ userId: this.$auth0.user.value.sub });
        await this.$api.post(
          `${API_ROUTES.POST_LIKE}?postId=${this.postCopy.id}`
        );
      } catch {
        this.$notify.fail();
      }
    },
    redirectToPostPage() {
      this.$router.push(`/post/${this.postCopy.id}`);
    },
    redirectToEditPostPage() {
      this.$router.push(`/edit-post/${this.postCopy.id}`);
    },
  },
  computed: {
    canEditPost() {
      return this.$auth0.user.value.sub === this.postCopy.userId;
    },
    canLike() {
      return !this.postCopy.likes.some(
        (x) => x.userId === this.$auth0.user.value.sub
      );
    },
  },
  mounted() {
    this.postCopy = extend(true, {}, this.post);
  },
};
</script>

<style lang="sass" scoped>
.post-preview
  width: 60vw
  height: 100%
</style>
