<template>
  <q-card v-if="commentCopy" class="q-mt-md post">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="commentCopy.avatar || getRandomAvatar()" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label> {{ commentCopy.userId }} </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ date.formatDate(commentCopy.createdAt, "YYYY MMM ddd") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <template v-if="editMode">
        <div @blur="editMode = false">
          <q-editor v-model="newContent" label="Content" />
        </div>
      </template>
      <template v-else>
        <span v-html="newContent"></span>
      </template>
    </q-card-section>

    <q-card-actions>
      <q-btn flat color="red-14" @click.stop="like()">
        <template #default>
          <template v-if="canLike">
            <q-icon name="favorite_border"></q-icon>
          </template>
          <template v-else>
            <q-icon name="favorite"></q-icon>
          </template>
          <span class="q-ml-sm">{{ commentCopy.likes.length }}</span>
        </template>
      </q-btn>
      <q-space />
      <template v-if="canEditComment && !editMode">
        <q-btn
          flat
          color="primary"
          icon="edit"
          label="Edit"
          @click="editMode = true"
        ></q-btn>
      </template>
      <template v-if="canEditComment && editMode">
        <q-btn
          flat
          color="primary"
          icon="save"
          label="Save"
          @click="updateComment()"
        ></q-btn>
      </template>
      <q-separator vertical inset />
      <q-btn
        v-if="canDeleteComment"
        flat
        color="primary"
        icon="delete_outline"
        label="Delete"
        @click="deleteComment()"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { date, extend } from "quasar";
import { API_ROUTES } from "src/utils/api_routes";
import { getRandomAvatar } from "src/utils/avatar";

export default {
  name: "CommentComponent",
  data() {
    return {
      date,
      getRandomAvatar,
      commentCopy: null,
      editMode: false,
      newContent: null,
    };
  },
  props: {
    comment: Object,
  },
  computed: {
    canEditComment() {
      return this.commentCopy.userId === this.$auth0.user.value.sub;
    },
    canDeleteComment() {
      return this.commentCopy.userId === this.$auth0.user.value.sub;
    },
    canLike() {
      return !this.commentCopy.likes.some(
        (x) => x.userId === this.$auth0.user.value.sub
      );
    },
  },
  methods: {
    async like() {
      try {
        this.commentCopy.likes.push({ userId: this.$auth0.user.value.sub });
        await this.$api.post(
          `${API_ROUTES.COMMENT_LIKE}?commentId=${this.commentCopy.id}`
        );
      } catch {
        this.$notify.fail();
      }
    },
    async updateComment() {
      if (this.newContent !== this.commentCopy.content) {
        try {
          await this.$api.put(`${API_ROUTES.COMMENT_UPDATE}`, {
            id: this.commentCopy.id,
            content: this.newContent,
          });
          this.commentCopy.content = this.newContent;
          this.$notify.success();
        } catch {
          this.$notify.fail();
        }
      }
      this.editMode = false;
    },
    async deleteComment() {
      try {
        const { data } = await this.$api.delete(
          `${API_ROUTES.COMMENT_DELETE}?commentId=${this.commentCopy.id}`
        );
        if (data) {
          this.$notify.success();
          this.$emit("comment-delete", this.commentCopy.id);
        } else {
          this.$notify.fail();
        }
      } catch {
        this.$notify.fail();
      }
    },
  },
  mounted() {
    this.commentCopy = extend(true, {}, this.comment);
    this.newContent = this.commentCopy.content;
  },
};
</script>
