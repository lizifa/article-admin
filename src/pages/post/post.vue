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

    <el-form-item>
      <el-button type="primary" @click="submitForm('formData')" size="mini"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { getArticle, updateAction } from '../../apis/common'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { cloneDeep } from 'lodash'
import { category } from '../../utils/category'
/*
 * fn [function] 需要防抖的函数
 * delay [number] 毫秒，防抖期限值
 */
// function debounce(fn, delay) {
//   let timer = null //借助闭包
//   return function() {
//     if (timer) {
//       clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
//       timer = setTimeout(fn, delay)
//     } else {
//       timer = setTimeout(fn, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
//     }
//   }
// }

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
        title: ''
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
        if (code === 0) {
          data[0].tag_ids = JSON.parse(data[0].tag_ids)
          this.$refs['postComponent'].init(data[0])
        }
      }
    },
    change(value, render) {
      this.formData.html_content = render
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = cloneDeep(this.formData)
          params.tag_ids = JSON.stringify(params.tag_ids)
          updateAction(params)
        }
      })
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
</style>
