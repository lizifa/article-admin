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
      :rules="[{ required: true, message: '发布内容不能为空' }]"
    >
      <mavon-editor
        v-model="formData.mark_content"
        @change="change"
        style="min-height: 600px"
      />
    </el-form-item>
    <!-- <el-form-item label="封面" prop="cover_image" required>
      <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="submitForm('formData')" size="mini"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { updateAction } from '../../apis/common'
import { cloneDeep } from 'lodash'
import { category } from '../../utils/category'

export default {
  components: {
    mavonEditor
  },
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
        is_original: '',
        link_url: '',
        mark_content: '',
        tag_ids: [],
        title: ''
      }
    }
  },
  methods: {
    init(data) {
      data = cloneDeep(data)
      this.formData = data
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
  }
}
</script>
