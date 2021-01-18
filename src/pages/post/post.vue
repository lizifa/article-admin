<template>
  <PostComponent ref="postComponent" />
</template>

<script>
import PostComponent from '../../components/createPost'
import { getArticle } from '../../apis/common'

export default {
  components: {
    PostComponent
  },
  methods: {
    async getArticle() {
      let { params, name } = this.$route
      if (name === 'update') {
        let { code, data } = await getArticle({ id: params.id })
        if (code === 0) {
          data[0].tag_ids = JSON.parse(data[0].tag_ids)
          this.$refs['postComponent'].init(data[0])
        }
      }
    }
  },
  async created() {
    await this.getArticle()
  }
}
</script>
