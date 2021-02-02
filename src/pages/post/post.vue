<template>
  <el-form
    :model="formData"
    ref="formData"
    label-width="auto"
    label-position="top"
    label-suffix="："
  >
    <el-form-item label="文章来源" prop="is_original" required>
      <span>
        <el-radio v-model="formData.is_original" label="1">原创</el-radio>
        <el-radio v-model="formData.is_original" label="2">转载</el-radio>
      </span>
    </el-form-item>

    <el-form-item
      label="文章来源链接"
      prop="link_url"
      required
      v-if="formData.is_original == 2"
    >
      <el-input v-model="formData.link_url"></el-input>
    </el-form-item>
    <el-form-item label="文章标题" prop="title" required>
      <el-input v-model="formData.title"></el-input>
    </el-form-item>

    <el-form-item label="文章简介" prop="rief_content" required>
      <el-input
        v-model="formData.rief_content"
        type="textarea"
        rows="5"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="标签"
      prop="tag_ids"
      :rules="[{ required: true, message: '标签不能为空' }]"
    >
      <el-select
        v-model="formData.tag_ids"
        placeholder="请选择标签"
        style="width: 100%"
        multiple
      >
        <el-option
          v-for="(item, index) in category"
          :key="index"
          :label="item.category.category_name"
          :value="item.category_id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      prop="mark_content"
      label="文章内容"
      :rules="[{ required: true, message: '发布内容不能为空' }]"
    >
      <mavon-editor
        v-model="formData.mark_content"
        @change="change"
        style="min-height: 600px"
      />
    </el-form-item>
    <template v-if="formData.reference.length">
      <el-form-item label="主要参考资料">
        <div
          v-for="(item, index) in formData.reference"
          :key="index"
          style="display: flex; margin-bottom: 22px"
          class="el-form-item"
        >
          <el-form-item
            :prop="'reference.' + index + '.name'"
            :rules="[
              { required: true, message: '请输入链接名', trigger: 'blur' }
            ]"
            style="flex: 1; max-width: 300px"
          >
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'reference.' + index + '.link'"
            :rules="[
              { required: true, message: '请输入链接', trigger: 'blur' }
            ]"
            style="flex: 1; margin-left: 10px"
          >
            <el-input v-model="item.link"></el-input>
          </el-form-item>
          <el-button
            @click.prevent="removeReference(index)"
            v-if="formData.reference.length"
            style="margin-left: 10px"
            type="danger"
            >删除</el-button
          >
        </div>
      </el-form-item>
    </template>
    <div class="footer-box">
      <el-button type="primary" @click="submit('formData')" size="mini"
        >提交</el-button
      >
      <el-button @click="addReference" size="mini">新增参考</el-button>
    </div>
  </el-form>
</template>

<script>
// http://chuantu.biz/
import { getArticle, updateAction } from '../../api/common'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { cloneDeep } from 'lodash'
import { category } from '../../utils/category'
const referenceItem = {
  name: '',
  link: ''
}
export default {
  data() {
    return {
      category,
      formData: {
        rief_content: '',
        category_id: '',
        cover_image: '',
        edit_type: '',
        html_content: '',
        is_english: '',
        is_gfw: '',
        is_original: '1',
        link_url: '',
        mark_content: '',
        tag_ids: [],
        title: '',
        reference: []
      }
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    async getArticle() {
      let { params, name } = this.$route
      if (name === 'update') {
        let { code, data } = await getArticle({ id: params.id })
        data = data[0]
        if (code === 200) {
          data.tag_ids = JSON.parse(data.tag_ids)
          data.reference = data.reference ? JSON.parse(data.reference) : []
          this.formData = { ...this.formData, ...data }
        }
      }
    },
    change(value, render) {
      this.formData.html_content = render
    },
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = cloneDeep(this.formData)
          params.tag_ids = JSON.stringify(params.tag_ids)
          params.reference = JSON.stringify(params.reference)
          let { code = 0, message = '' } = await updateAction(params)
          if (code === 201) {
            this.$refs[formName].resetFields()
            this.$message({ message: '操作成功', type: 'success' })
            this.$router.push({ name: 'list' })
          } else {
            this.$message({ message, type: 'warning' })
          }
        }
      })
    },
    addReference() {
      this.formData.reference.push(referenceItem)
    },
    removeReference(index) {
      this.formData.reference.splice(index, 1)
    }
  },
  async created() {
    await this.getArticle()
  }
}
</script>
<style>
.v-note-wrapper
  .v-note-panel
  .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar {
  width: 1px !important;
  background-color: #e5e5e5;
}
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000000000;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
.el-form--label-top {
  padding-bottom: 80px;
}
</style>
