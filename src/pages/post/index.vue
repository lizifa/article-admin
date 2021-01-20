<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="文章ID">
        <el-input
          v-model="searchForm.article_id"
          placeholder="文章ID"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="todoAction({}, 'search')"
          >查询</el-button
        >
        <el-button type="success" @click="todoAction({}, 'add')"
          >创建文章</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="rief_content" label="简介"> </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="todoAction(scope.row, 'update')"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="todoAction(scope.row, 'delete')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getListAction, deleteArticle } from '../../api/common'

export default {
  data() {
    return {
      searchForm: {
        article_id: ''
      },
      tableData: []
    }
  },
  methods: {
    async getList() {
      const { code, data } = await getListAction({ page: 1, size: 20 })
      if (code === 200) {
        this.tableData = data
      }
    },
    async todoAction(data, type) {
      switch (type) {
        case 'search':
          console.log('submit!')
          break
        case 'add':
          this.$router.push({
            name: 'create'
          })
          break
        case 'update':
          this.$router.push({
            name: 'update',
            params: {
              id: data.article_id
            }
          })
          break
        case 'delete':
          deleteArticle(data).then(() => {
            this.getList()
          })
          break
      }
    }
  },
  async created() {
    await this.getList()
  }
}
</script>
