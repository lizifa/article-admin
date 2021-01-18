<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="文章标题">
        <el-input v-model="formInline.user" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章ID">
        <el-input v-model="formInline.user" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchAction">查询</el-button>
        <el-button type="success" @click="add">创建文章</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="rief_content" label="简介"> </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getListAction } from '../../apis/common'

export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    async getList() {
      const { code, data } = await getListAction({ page: 1, size: 20 })
      if (code === 0) {
        this.tableData = data
      }
    },
    searchAction() {
      console.log('submit!')
    },
    update(data) {
      this.$router.push({
        name: 'update',
        params: {
          id: data.article_id
        }
      })
    },
    add() {
      this.$router.push({
        name: 'create'
      })
    }
  },
  async created() {
    await this.getList()
  }
}
</script>
