<template>
  <el-form
    :model="formData"
    ref="formData"
    label-width="auto"
    label-position="top"
    label-suffix="："
  >
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

const category = [
  {
    category_id: '6809637769959178254',
    category: {
      category_id: '6809637769959178254',
      category_name: '后端',
      category_url: 'backend',
      rank: 1,
      ctime: 1457483880,
      mtime: 1432503193,
      show_type: 3
    },
    user_interact: {
      id: 6809637769959178254,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546553,
        tag_id: '6809640445233070094',
        tag_name: 'Java',
        color: '#DD2C2A',
        icon: 'https://lc-gold-cdn.xitu.io/f8ee3cd45f949a546263.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 57104,
        concern_user_count: 271067
      },
      {
        id: 2546527,
        tag_id: '6809640408797167623',
        tag_name: '后端',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/d83da9d012ddb7ae85f4.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 24502,
        concern_user_count: 391277
      },
      {
        id: 2546982,
        tag_id: '6809641037787561992',
        tag_name: 'Spring Boot',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/f77e4a02edb8b963a2c5.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5960,
        concern_user_count: 29579
      },
      {
        id: 2546494,
        tag_id: '6809640364677267469',
        tag_name: 'Go',
        color: '#64D7E3',
        icon: 'https://lc-gold-cdn.xitu.io/1aae38ab22d12b654cfa.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 6406,
        concern_user_count: 79384
      },
      {
        id: 2546556,
        tag_id: '6809640448827588622',
        tag_name: 'Python',
        color: '#356E9C',
        icon: 'https://lc-gold-cdn.xitu.io/b51a1dacf9bb7883defe.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 19091,
        concern_user_count: 202147
      },
      {
        id: 2546740,
        tag_id: '6809640703325372423',
        tag_name: 'Spring',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/279e631b065a5a31289f.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 6886,
        concern_user_count: 83823
      },
      {
        id: 2546496,
        tag_id: '6809640366896054286',
        tag_name: 'MySQL',
        color: '#026088',
        icon: 'https://lc-gold-cdn.xitu.io/b2fbb06dce13eeb3bb9b.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7476,
        concern_user_count: 173942
      },
      {
        id: 2546499,
        tag_id: '6809640371019055111',
        tag_name: 'Redis',
        color: '#A51912',
        icon: 'https://lc-gold-cdn.xitu.io/4045af43b278afc7229b.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4917,
        concern_user_count: 134947
      },
      {
        id: 2546666,
        tag_id: '6809640600502009863',
        tag_name: '数据库',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/c57a5426c2a8ab565881.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9267,
        concern_user_count: 258088
      },
      {
        id: 2546735,
        tag_id: '6809640696455102472',
        tag_name: 'JVM',
        color: '#3b0a4c',
        icon: 'https://lc-gold-cdn.xitu.io/796f607b1e45a38c61f9.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 3847,
        concern_user_count: 27901
      },
      {
        id: 2546592,
        tag_id: '6809640499062767624',
        tag_name: '算法',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/68a1097944c7fa1d7961.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 14725,
        concern_user_count: 284611
      },
      {
        id: 2546594,
        tag_id: '6809640501776482317',
        tag_name: '架构',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/f27d811ad7e2b2a0bc24.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 8459,
        concern_user_count: 311725
      },
      {
        id: 2546510,
        tag_id: '6809640385980137480',
        tag_name: 'Linux',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/b49dc843907aa7843a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7368,
        concern_user_count: 211157
      },
      {
        id: 2546570,
        tag_id: '6809640467731316749',
        tag_name: '设计模式',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/95e6729d56b35272b0d6.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5666,
        concern_user_count: 241861
      },
      {
        id: 2547060,
        tag_id: '6809641146378092552',
        tag_name: 'Spring Cloud',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/15438041366708d0dbf37105266049bef27d81fe514d5.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1930,
        concern_user_count: 7473
      }
    ]
  },
  {
    category_id: '6809637767543259144',
    category: {
      category_id: '6809637767543259144',
      category_name: '前端',
      category_url: 'frontend',
      rank: 2,
      ctime: 1457483942,
      mtime: 1432503190,
      show_type: 3
    },
    user_interact: {
      id: 6809637767543259144,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546519,
        tag_id: '6809640398105870343',
        tag_name: 'JavaScript',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/5d70fd6af940df373834.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 49208,
        concern_user_count: 368980
      },
      {
        id: 2546526,
        tag_id: '6809640407484334093',
        tag_name: '前端',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 50388,
        concern_user_count: 488810
      },
      {
        id: 2546498,
        tag_id: '6809640369764958215',
        tag_name: 'Vue.js',
        color: '#41B883',
        icon: 'https://lc-gold-cdn.xitu.io/7b5c3eb591b671749fee.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 22485,
        concern_user_count: 286455
      },
      {
        id: 2546490,
        tag_id: '6809640357354012685',
        tag_name: 'React.js',
        color: '#61DAFB',
        icon: 'https://lc-gold-cdn.xitu.io/f655215074250f10f8d4.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 13177,
        concern_user_count: 211630
      },
      {
        id: 2546516,
        tag_id: '6809640394175971342',
        tag_name: 'CSS',
        color: '#244DE4',
        icon: 'https://lc-gold-cdn.xitu.io/66de0c4eb9d10130d5bf.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 11475,
        concern_user_count: 276324
      },
      {
        id: 2546492,
        tag_id: '6809640361531539470',
        tag_name: 'Node.js',
        color: '#e81864',
        icon: 'https://lc-gold-cdn.xitu.io/f16f548d25028a1fdd80.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9855,
        concern_user_count: 261968
      },
      {
        id: 2546614,
        tag_id: '6809640528267706382',
        tag_name: 'Webpack',
        color: '#6F94DB',
        icon: 'https://lc-gold-cdn.xitu.io/73e856b07f83b4231c1e.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5255,
        concern_user_count: 191871
      },
      {
        id: 2546524,
        tag_id: '6809640404791590919',
        tag_name: '面试',
        color: '#545454',
        icon: 'https://lc-gold-cdn.xitu.io/85dd1ce8008458ac220c.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 10318,
        concern_user_count: 314770
      },
      {
        id: 2546704,
        tag_id: '6809640653266354190',
        tag_name: '微信小程序',
        color: '#11a600',
        icon: 'https://lc-gold-cdn.xitu.io/a1e7773920f51db40441.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5932,
        concern_user_count: 205152
      },
      {
        id: 2546625,
        tag_id: '6809640543006490638',
        tag_name: 'TypeScript',
        color: '#0061c4',
        icon: 'https://lc-gold-cdn.xitu.io/d788a559489fa6e30b25.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2586,
        concern_user_count: 42515
      },
      {
        id: 2547019,
        tag_id: '6809641090145058824',
        tag_name: 'Flutter',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1519790365175e2d3ba2174d5c8f3fdc4687a8bbf5768.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7112,
        concern_user_count: 38098
      },
      {
        id: 2546522,
        tag_id: '6809640402103042061',
        tag_name: '前端框架',
        color: '#F2AB5B',
        icon: 'https://lc-gold-cdn.xitu.io/f7a198f1e1aeb6d79878.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 3468,
        concern_user_count: 236361
      },
      {
        id: 2546683,
        tag_id: '6809640625856577549',
        tag_name: '浏览器',
        color: '#47ebc7',
        icon: 'https://lc-gold-cdn.xitu.io/baf3558e2acdfa623201.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2793,
        concern_user_count: 26466
      },
      {
        id: 2546592,
        tag_id: '6809640499062767624',
        tag_name: '算法',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/68a1097944c7fa1d7961.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 14725,
        concern_user_count: 284611
      },
      {
        id: 2546515,
        tag_id: '6809640392770715656',
        tag_name: 'HTML',
        color: '#E44D25',
        icon: 'https://lc-gold-cdn.xitu.io/f18965b2a0ef9cac862e.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5007,
        concern_user_count: 222720
      }
    ]
  },
  {
    category_id: '6809635626879549454',
    category: {
      category_id: '6809635626879549454',
      category_name: 'Android',
      category_url: 'android',
      rank: 3,
      ctime: 1461266353,
      mtime: 1432503184,
      show_type: 3
    },
    user_interact: {
      id: 6809635626879549454,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546521,
        tag_id: '6809640400832167949',
        tag_name: 'Android',
        color: '#A3CC28',
        icon: 'https://lc-gold-cdn.xitu.io/7bab0e1e66ea386e6f94.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 34380,
        concern_user_count: 246814
      },
      {
        id: 2547019,
        tag_id: '6809641090145058824',
        tag_name: 'Flutter',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1519790365175e2d3ba2174d5c8f3fdc4687a8bbf5768.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7112,
        concern_user_count: 38098
      },
      {
        id: 2546553,
        tag_id: '6809640445233070094',
        tag_name: 'Java',
        color: '#DD2C2A',
        icon: 'https://lc-gold-cdn.xitu.io/f8ee3cd45f949a546263.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 57104,
        concern_user_count: 271067
      },
      {
        id: 2546677,
        tag_id: '6809640615584727053',
        tag_name: 'Kotlin',
        color: '#f39000',
        icon: 'https://lc-gold-cdn.xitu.io/9979306cd7d324ca5a27.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2717,
        concern_user_count: 33040
      },
      {
        id: 2546726,
        tag_id: '6809640684354535432',
        tag_name: '源码',
        color: '#000000',
        icon:
          'https://user-gold-cdn.xitu.io/1550744852177428affe45c5925b2ef20f04344f3bea9.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4067,
        concern_user_count: 42129
      },
      {
        id: 2547032,
        tag_id: '6809641107346063368',
        tag_name: 'Android Jetpack',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1526543778867fadeb890c0388755fc449587604bb627.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 667,
        concern_user_count: 1784
      },
      {
        id: 2546607,
        tag_id: '6809640519136706568',
        tag_name: 'gradle',
        color: '#006633',
        icon: 'https://lc-gold-cdn.xitu.io/7a7317267804b016ce78.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1484,
        concern_user_count: 74008
      },
      {
        id: 2546524,
        tag_id: '6809640404791590919',
        tag_name: '面试',
        color: '#545454',
        icon: 'https://lc-gold-cdn.xitu.io/85dd1ce8008458ac220c.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 10318,
        concern_user_count: 314770
      },
      {
        id: 2546502,
        tag_id: '6809640375880253447',
        tag_name: 'GitHub',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/0d614af263aa63aa6a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9217,
        concern_user_count: 357702
      },
      {
        id: 2546506,
        tag_id: '6809640380334604295',
        tag_name: 'Google',
        color: '#3E82F7',
        icon: 'https://lc-gold-cdn.xitu.io/dfaa9adfc35ab7476040.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4552,
        concern_user_count: 150657
      },
      {
        id: 2547076,
        tag_id: '6809641167680962568',
        tag_name: '性能优化',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1552374613638f172b668f237482fee67f11b7ac8c181.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1598,
        concern_user_count: 6252
      },
      {
        id: 2546594,
        tag_id: '6809640501776482317',
        tag_name: '架构',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/f27d811ad7e2b2a0bc24.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 8459,
        concern_user_count: 311725
      },
      {
        id: 2546535,
        tag_id: '6809640419505209358',
        tag_name: '开源',
        color: '#6EBD68',
        icon: 'https://lc-gold-cdn.xitu.io/553ecacd498946a9a6d9.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5404,
        concern_user_count: 204118
      },
      {
        id: 2546569,
        tag_id: '6809640466309447693',
        tag_name: 'RxJava',
        color: '#850091',
        icon: 'https://lc-gold-cdn.xitu.io/6fb1878f782cd03388f9.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1219,
        concern_user_count: 62673
      },
      {
        id: 2546673,
        tag_id: '6809640609918222349',
        tag_name: 'Android Studio',
        color: '#86b934',
        icon: 'https://lc-gold-cdn.xitu.io/27fabb01ab6daa480a19.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1273,
        concern_user_count: 104153
      }
    ]
  },
  {
    category_id: '6809635626661445640',
    category: {
      category_id: '6809635626661445640',
      category_name: 'iOS',
      category_url: 'ios',
      rank: 4,
      ctime: 1461266350,
      mtime: 1432503174,
      show_type: 3
    },
    user_interact: {
      id: 6809635626661445640,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546520,
        tag_id: '6809640399544516616',
        tag_name: 'iOS',
        color: '#616161',
        icon:
          'https://user-gold-cdn.xitu.io/155962881259379c25251a455680e3249366e3a3ac373.jpg',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 20882,
        concern_user_count: 174656
      },
      {
        id: 2546567,
        tag_id: '6809640463633481741',
        tag_name: 'Swift',
        color: '#F44C29',
        icon: 'https://lc-gold-cdn.xitu.io/eb7ab66be4c2898b5aa9.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5005,
        concern_user_count: 66356
      },
      {
        id: 2546528,
        tag_id: '6809640410084802573',
        tag_name: 'Objective-C',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/71d968ea2fde62410b19.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2189,
        concern_user_count: 56700
      },
      {
        id: 2547019,
        tag_id: '6809641090145058824',
        tag_name: 'Flutter',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1519790365175e2d3ba2174d5c8f3fdc4687a8bbf5768.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7112,
        concern_user_count: 38098
      },
      {
        id: 2547002,
        tag_id: '6809641065780346887',
        tag_name: 'OpenGL',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/1312edc98d387c686ff3.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1147,
        concern_user_count: 4167
      },
      {
        id: 2546540,
        tag_id: '6809640426581000206',
        tag_name: 'Apple',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/9bc1c26409d193494211.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 3079,
        concern_user_count: 93595
      },
      {
        id: 2547102,
        tag_id: '6809641204351926286',
        tag_name: 'SwiftUI',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/15596284841681fc99e72a9a2eea596951822dd7bc289.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 402,
        concern_user_count: 919
      },
      {
        id: 2546603,
        tag_id: '6809640513700888584',
        tag_name: 'Xcode',
        color: '#26A8FB',
        icon: 'https://lc-gold-cdn.xitu.io/a177fa3d60a1d0062129.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1244,
        concern_user_count: 62951
      },
      {
        id: 2546701,
        tag_id: '6809640648812003341',
        tag_name: 'RxSwift',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/a966d6fdc0817aee.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 331,
        concern_user_count: 4540
      },
      {
        id: 2546524,
        tag_id: '6809640404791590919',
        tag_name: '面试',
        color: '#545454',
        icon: 'https://lc-gold-cdn.xitu.io/85dd1ce8008458ac220c.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 10318,
        concern_user_count: 314770
      },
      {
        id: 2546502,
        tag_id: '6809640375880253447',
        tag_name: 'GitHub',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/0d614af263aa63aa6a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9217,
        concern_user_count: 357702
      },
      {
        id: 2546592,
        tag_id: '6809640499062767624',
        tag_name: '算法',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/68a1097944c7fa1d7961.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 14725,
        concern_user_count: 284611
      },
      {
        id: 2546570,
        tag_id: '6809640467731316749',
        tag_name: '设计模式',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/95e6729d56b35272b0d6.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5666,
        concern_user_count: 241861
      },
      {
        id: 2547033,
        tag_id: '6809641108675493896',
        tag_name: 'WWDC',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/156111682464695481be401cd28b9d6143cbcfbb13596.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 106,
        concern_user_count: 4705
      },
      {
        id: 2546745,
        tag_id: '6809640709902041101',
        tag_name: '逆向',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/7325bccaf3a72ff529b2.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 704,
        concern_user_count: 8104
      }
    ]
  },
  {
    category_id: '6809637773935378440',
    category: {
      category_id: '6809637773935378440',
      category_name: '人工智能',
      category_url: 'ai',
      rank: 5,
      ctime: 1500876664,
      mtime: 1500876667,
      show_type: 3
    },
    user_interact: {
      id: 6809637773935378440,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546696,
        tag_id: '6809640642101116936',
        tag_name: '人工智能',
        color: '#2e6cff',
        icon: 'https://lc-gold-cdn.xitu.io/9b525117507d7a76c4ac.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 10227,
        concern_user_count: 190901
      },
      {
        id: 2546612,
        tag_id: '6809640525595934734',
        tag_name: '机器学习',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/a066ea8ec92485ff84e8.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5127,
        concern_user_count: 138272
      },
      {
        id: 2546722,
        tag_id: '6809640679082295303',
        tag_name: '深度学习',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/9232fafd72e21b50a1e7.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 3289,
        concern_user_count: 66478
      },
      {
        id: 2546592,
        tag_id: '6809640499062767624',
        tag_name: '算法',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/68a1097944c7fa1d7961.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 14725,
        concern_user_count: 284611
      },
      {
        id: 2546556,
        tag_id: '6809640448827588622',
        tag_name: 'Python',
        color: '#356E9C',
        icon: 'https://lc-gold-cdn.xitu.io/b51a1dacf9bb7883defe.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 19091,
        concern_user_count: 202147
      },
      {
        id: 2546716,
        tag_id: '6809640670488166407',
        tag_name: 'TensorFlow',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/25f1fe27c01c84ef9642.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1103,
        concern_user_count: 21425
      },
      {
        id: 2546972,
        tag_id: '6809641023665356814',
        tag_name: '神经网络',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/8e32ca6d5fcd7dee7d5e.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1333,
        concern_user_count: 24865
      },
      {
        id: 2546904,
        tag_id: '6809640930740535303',
        tag_name: 'NLP',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/0072d736366e7d3c0028.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 940,
        concern_user_count: 9319
      },
      {
        id: 2546746,
        tag_id: '6809640711177109517',
        tag_name: '计算机视觉',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/8d1b7f5a309434d082fe.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 679,
        concern_user_count: 18826
      },
      {
        id: 2546506,
        tag_id: '6809640380334604295',
        tag_name: 'Google',
        color: '#3E82F7',
        icon: 'https://lc-gold-cdn.xitu.io/dfaa9adfc35ab7476040.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4552,
        concern_user_count: 150657
      },
      {
        id: 2546502,
        tag_id: '6809640375880253447',
        tag_name: 'GitHub',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/0d614af263aa63aa6a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9217,
        concern_user_count: 357702
      },
      {
        id: 2546993,
        tag_id: '6809641053432315911',
        tag_name: '数据分析',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/3dd390ffd17927e220b4.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1629,
        concern_user_count: 18187
      },
      {
        id: 2546676,
        tag_id: '6809640614175604744',
        tag_name: '掘金翻译计划',
        color: '#0081ff',
        icon: 'https://lc-gold-cdn.xitu.io/95f7e8be776556ab8d82.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2165,
        concern_user_count: 41230
      },
      {
        id: 2546594,
        tag_id: '6809640501776482317',
        tag_name: '架构',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/f27d811ad7e2b2a0bc24.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 8459,
        concern_user_count: 311725
      },
      {
        id: 2546949,
        tag_id: '6809640991868321799',
        tag_name: 'Keras',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/76ee3d4d55d0b18c7aea.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 162,
        concern_user_count: 1501
      }
    ]
  },
  {
    category_id: '6809637771511070734',
    category: {
      category_id: '6809637771511070734',
      category_name: '开发工具',
      category_url: 'freebie',
      rank: 6,
      ctime: 1457483920,
      mtime: 1432503202,
      show_type: 3
    },
    user_interact: {
      id: 6809637771511070734,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546501,
        tag_id: '6809640373774712840',
        tag_name: 'Git',
        color: '#F64E19',
        icon: 'https://lc-gold-cdn.xitu.io/3cf1219be35e6fa28229.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4676,
        concern_user_count: 201925
      },
      {
        id: 2546510,
        tag_id: '6809640385980137480',
        tag_name: 'Linux',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/b49dc843907aa7843a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7368,
        concern_user_count: 211157
      },
      {
        id: 2546502,
        tag_id: '6809640375880253447',
        tag_name: 'GitHub',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/0d614af263aa63aa6a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9217,
        concern_user_count: 357702
      },
      {
        id: 2546706,
        tag_id: '6809640656265281550',
        tag_name: 'Visual Studio Code',
        color: '#127BCB',
        icon:
          'https://user-gold-cdn.xitu.io/1561116758651a07c4da9f18adb4f9a343915994122cf.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 976,
        concern_user_count: 42769
      },
      {
        id: 2546526,
        tag_id: '6809640407484334093',
        tag_name: '前端',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 50388,
        concern_user_count: 488810
      },
      {
        id: 2546556,
        tag_id: '6809640448827588622',
        tag_name: 'Python',
        color: '#356E9C',
        icon: 'https://lc-gold-cdn.xitu.io/b51a1dacf9bb7883defe.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 19091,
        concern_user_count: 202147
      },
      {
        id: 2546553,
        tag_id: '6809640445233070094',
        tag_name: 'Java',
        color: '#DD2C2A',
        icon: 'https://lc-gold-cdn.xitu.io/f8ee3cd45f949a546263.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 57104,
        concern_user_count: 271067
      },
      {
        id: 2546820,
        tag_id: '6809640812570214413',
        tag_name: 'IntelliJ IDEA',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/f4ba2e8ac95d7b81022c.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 891,
        concern_user_count: 29780
      },
      {
        id: 2546581,
        tag_id: '6809640482725953550',
        tag_name: '程序员',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/63baec1130bde0284e98.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 12292,
        concern_user_count: 255911
      },
      {
        id: 2546532,
        tag_id: '6809640415537397768',
        tag_name: '命令行',
        color: '#F56868',
        icon: 'https://lc-gold-cdn.xitu.io/03f4a3a6b66a8a91627d.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 3376,
        concern_user_count: 112637
      },
      {
        id: 2546666,
        tag_id: '6809640600502009863',
        tag_name: '数据库',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/c57a5426c2a8ab565881.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9267,
        concern_user_count: 258088
      },
      {
        id: 2546535,
        tag_id: '6809640419505209358',
        tag_name: '开源',
        color: '#6EBD68',
        icon: 'https://lc-gold-cdn.xitu.io/553ecacd498946a9a6d9.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 5404,
        concern_user_count: 204118
      },
      {
        id: 2546507,
        tag_id: '6809640381920051207',
        tag_name: 'Chrome',
        color: '#4586F2',
        icon: 'https://lc-gold-cdn.xitu.io/084db5f7bc6a239be270.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2369,
        concern_user_count: 123435
      },
      {
        id: 2546518,
        tag_id: '6809640396788858887',
        tag_name: 'Docker',
        color: '#344D56',
        icon: 'https://lc-gold-cdn.xitu.io/1265c034d36735225ac5.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4490,
        concern_user_count: 125353
      },
      {
        id: 2547039,
        tag_id: '6809641116783083528',
        tag_name: 'Serverless',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1531896618163098d601094bcc2d79c1d31222a1a5aca.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 670,
        concern_user_count: 1650
      }
    ]
  },
  {
    category_id: '6809637776263217160',
    category: {
      category_id: '6809637776263217160',
      category_name: '代码人生',
      category_url: 'career',
      rank: 7,
      ctime: 1553759544,
      mtime: 1553759548,
      show_type: 3
    },
    user_interact: {
      id: 6809637776263217160,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546581,
        tag_id: '6809640482725953550',
        tag_name: '程序员',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/63baec1130bde0284e98.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 12292,
        concern_user_count: 255911
      },
      {
        id: 2546553,
        tag_id: '6809640445233070094',
        tag_name: 'Java',
        color: '#DD2C2A',
        icon: 'https://lc-gold-cdn.xitu.io/f8ee3cd45f949a546263.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 57104,
        concern_user_count: 271067
      },
      {
        id: 2546556,
        tag_id: '6809640448827588622',
        tag_name: 'Python',
        color: '#356E9C',
        icon: 'https://lc-gold-cdn.xitu.io/b51a1dacf9bb7883defe.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 19091,
        concern_user_count: 202147
      },
      {
        id: 2546592,
        tag_id: '6809640499062767624',
        tag_name: '算法',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/68a1097944c7fa1d7961.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 14725,
        concern_user_count: 284611
      },
      {
        id: 2546526,
        tag_id: '6809640407484334093',
        tag_name: '前端',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 50388,
        concern_user_count: 488810
      },
      {
        id: 2547074,
        tag_id: '6809641165021773831',
        tag_name: '年终总结',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1547394833079a5c0cf87b97aa43fc5f026fc5139ba4b.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 377,
        concern_user_count: 1994
      },
      {
        id: 2546527,
        tag_id: '6809640408797167623',
        tag_name: '后端',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/d83da9d012ddb7ae85f4.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 24502,
        concern_user_count: 391277
      },
      {
        id: 2546510,
        tag_id: '6809640385980137480',
        tag_name: 'Linux',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/b49dc843907aa7843a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7368,
        concern_user_count: 211157
      },
      {
        id: 2546562,
        tag_id: '6809640456868085768',
        tag_name: '代码规范',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/cca10b4907aaca2788dd.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 1747,
        concern_user_count: 302522
      },
      {
        id: 2546536,
        tag_id: '6809640420889346056',
        tag_name: '编程语言',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/cde94583e8f0ca3f6127.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 3024,
        concern_user_count: 114680
      },
      {
        id: 2546524,
        tag_id: '6809640404791590919',
        tag_name: '面试',
        color: '#545454',
        icon: 'https://lc-gold-cdn.xitu.io/85dd1ce8008458ac220c.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 10318,
        concern_user_count: 314770
      },
      {
        id: 2546594,
        tag_id: '6809640501776482317',
        tag_name: '架构',
        color: '#C679FF',
        icon: 'https://lc-gold-cdn.xitu.io/f27d811ad7e2b2a0bc24.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 8459,
        concern_user_count: 311725
      },
      {
        id: 2547075,
        tag_id: '6809641166313619470',
        tag_name: '数据结构',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/15611151330534d322b6249cbb7d1a35d7a09a3c6e276.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2621,
        concern_user_count: 10168
      },
      {
        id: 2546502,
        tag_id: '6809640375880253447',
        tag_name: 'GitHub',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/0d614af263aa63aa6a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9217,
        concern_user_count: 357702
      },
      {
        id: 2547087,
        tag_id: '6809641183699009550',
        tag_name: '团队管理',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1553842589157c10f9ecd2226b20b3a517fd928d08afb.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 428,
        concern_user_count: 2548
      }
    ]
  },
  {
    category_id: '6809637772874219534',
    category: {
      category_id: '6809637772874219534',
      category_name: '阅读',
      category_url: 'article',
      rank: 8,
      ctime: 1457483895,
      mtime: 1432503208,
      show_type: 3
    },
    user_interact: {
      id: 6809637772874219534,
      omitempty: 8,
      user_id: 2277843821399774,
      is_digg: false,
      is_follow: false,
      is_collect: false
    },
    hot_tags: [
      {
        id: 2546553,
        tag_id: '6809640445233070094',
        tag_name: 'Java',
        color: '#DD2C2A',
        icon: 'https://lc-gold-cdn.xitu.io/f8ee3cd45f949a546263.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 57104,
        concern_user_count: 271067
      },
      {
        id: 2546581,
        tag_id: '6809640482725953550',
        tag_name: '程序员',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/63baec1130bde0284e98.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 12292,
        concern_user_count: 255911
      },
      {
        id: 2546647,
        tag_id: '6809640574459576334',
        tag_name: '运维',
        color: '#437AA2',
        icon: 'https://lc-gold-cdn.xitu.io/3c1cb4a06d491d0fb483.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 3778,
        concern_user_count: 67597
      },
      {
        id: 2546526,
        tag_id: '6809640407484334093',
        tag_name: '前端',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 50388,
        concern_user_count: 488810
      },
      {
        id: 2546519,
        tag_id: '6809640398105870343',
        tag_name: 'JavaScript',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/5d70fd6af940df373834.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 49208,
        concern_user_count: 368980
      },
      {
        id: 2546592,
        tag_id: '6809640499062767624',
        tag_name: '算法',
        color: '#60ADFF',
        icon: 'https://lc-gold-cdn.xitu.io/68a1097944c7fa1d7961.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 14725,
        concern_user_count: 284611
      },
      {
        id: 2546556,
        tag_id: '6809640448827588622',
        tag_name: 'Python',
        color: '#356E9C',
        icon: 'https://lc-gold-cdn.xitu.io/b51a1dacf9bb7883defe.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 19091,
        concern_user_count: 202147
      },
      {
        id: 2546510,
        tag_id: '6809640385980137480',
        tag_name: 'Linux',
        color: '#616161',
        icon: 'https://lc-gold-cdn.xitu.io/b49dc843907aa7843a77.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7368,
        concern_user_count: 211157
      },
      {
        id: 2546524,
        tag_id: '6809640404791590919',
        tag_name: '面试',
        color: '#545454',
        icon: 'https://lc-gold-cdn.xitu.io/85dd1ce8008458ac220c.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 10318,
        concern_user_count: 314770
      },
      {
        id: 2546521,
        tag_id: '6809640400832167949',
        tag_name: 'Android',
        color: '#A3CC28',
        icon: 'https://lc-gold-cdn.xitu.io/7bab0e1e66ea386e6f94.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 34380,
        concern_user_count: 246814
      },
      {
        id: 2546680,
        tag_id: '6809640621406421006',
        tag_name: '产品',
        color: '#78c5ff',
        icon: 'https://lc-gold-cdn.xitu.io/e98ecc945167940d7b6a.png',
        back_ground: '',
        show_navi: 1,
        tag_alias: '',
        post_article_count: 10353,
        concern_user_count: 185147
      },
      {
        id: 2546666,
        tag_id: '6809640600502009863',
        tag_name: '数据库',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/c57a5426c2a8ab565881.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 9267,
        concern_user_count: 258088
      },
      {
        id: 2546720,
        tag_id: '6809640675944955918',
        tag_name: 'Kubernetes',
        color: '#000000',
        icon: 'https://lc-gold-cdn.xitu.io/f3388aa0b59e4d864cc2.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 2450,
        concern_user_count: 16402
      },
      {
        id: 2547019,
        tag_id: '6809641090145058824',
        tag_name: 'Flutter',
        color: '',
        icon:
          'https://user-gold-cdn.xitu.io/1519790365175e2d3ba2174d5c8f3fdc4687a8bbf5768.jpg',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 7112,
        concern_user_count: 38098
      },
      {
        id: 2546518,
        tag_id: '6809640396788858887',
        tag_name: 'Docker',
        color: '#344D56',
        icon: 'https://lc-gold-cdn.xitu.io/1265c034d36735225ac5.png',
        back_ground: '',
        show_navi: 0,
        tag_alias: '',
        post_article_count: 4490,
        concern_user_count: 125353
      }
    ]
  }
]

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
        mark_content:
          '---\n# npm是什么\n\n\u003e npm 是Node 的模块管理器，功能极其强大。 它是Node 获得成功的重要原因之一。 正因为有了npm，我们只要一行命令，就能安装别人写好的模块。\n\n### **npm install**\n\n[`npm install`](https://docs.npmjs.com/cli/install) 命令用来安装模块到`node_modules`目录。\n\n```\n$ npm install \u003cpackageName\u003e \n--save-dev -D 本地\n--save -S 生产\n-g 全局\n$ npm uninstall \u003cpackageName\u003e\n```\n\n安装之前，`npm install`会先检查，`node_modules`目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。\n\n如果你希望，一个模块不管是否安装过，npm 都要**强制重新安装**（不需要删掉nodemodules），可以使用`-f`或`--force`参数\n\n```bash\n$ npm install \u003cpackageName\u003e --force // 强制更新\n```\n\n### **npm update**\n\n如果想更新已安装模块，就要用到[`npm update`](https://docs.npmjs.com/cli/update)命令。\n\n\u003e ```bash\n\u003e $ npm update \u003cpackageName\u003e\n\u003e ```\n\n它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。\n\n### **模块的安装过程**\n\n1. 发出`npm install`命令\n2. npm 向 registry 查询模块压缩包的网址\n3. 下载压缩包，存放在`~/.npm`目录\n4. 解压压缩包到当前项目的`node_modules`目录\n\n\n\n# npm常用指令\n\n```js\nnpm init --yes(初始化配置)  -y\n\nnpm i (会根据package.json里面的键dependencies，devDependencies来安装相对应的包)\n\nnpm i 包(默认安装一个最新的包，这个包在node_modules文件夹里面，并且会更新在你的package.json文件)\n\nnpm i 包@3.0.0（安装一个指定版本的包，会更新在你的package.json文件）\n\nnpm i 包 --save-dev(安装一个开发环境所需要的包，会更新在你的package.json文件) -D\nnpm i 包 --save(安装一个生产环境所需要的包，会更新在你的package.json文件) -S\n\nnpm uninstall 包（卸载一个包，会更新在你的package.json文件）\n\nnpm update 包(更新此包版本为最新版本，会更新在你的package.json文件)\n\nnpm run 脚本键(会根据package.json里面的"scripts"里面的脚本键自动执行相对于的值)\n\nnpm publish  (根据package.json的name发布一个包) 发布到npm仓库\n\nnpm unpublish 包名 --force(卸载npm网站上自己上传的包)\n```\n\n# packageJson文件配置\n\n```json\n{\n\t"name": "axios", //发布的包名，默认是上级文件夹名。不得与现在npm中的包名重复。包名不能有大写字母/空格/下滑线!\n  "version": "2.2.2",//你这个包的版本，默认是1.0.0。对于npm包的版本号有着一系列的规则，模块的版本号采用X.Y.Z的格式，具体体现为：\n  1、修复bug，小改动，增加z。\n  2、增加新特性，可向后兼容，增加y\n  3、有很大的改动，无法向下兼容,增加x\n  "description": "用来请求接口，懂了吗二货", // 介绍\n  "main": "index.js",// 入口文件，默认是Index.js，可以修改成自己的文件,这个很重要，当你在实际项目使用的时候，let a = require("包名")，它就去会去找对应的文件路径哦。\n  "scripts": {                  // 快捷命令，在package.json同目录下输入命令 npm run 键 就会执行 相对应的命令\n    "bulid": "npx webpack --config myConfig.js",\n  \t"start": "xxx",\n  \t//例如 输入 npm run bulid 就会执行npx webpack --config myConfig.js的命令 。\n  \t// npm start 省略run\n  },\n  "keywords": [],\n  "author": "王二蛋",\n  "license": "ISC",// 这个直接回车，开源文件协议吧，也可以是MIT，看需要吧。\n  "dependencies": {             // 生产环境所依赖的包\n    "jquery": "^3.4.1",\n    "sea": "^1.0.2"\n  },\n  "devDependencies": {          // 开发环境所依赖的包\n    "webpack": "^4.41.6"\n  }\n}\n```\n\n\n\n# 更改npm默认的下载路径和缓存路径\n\nnpm config ls 命令可查看npm的安装信息以及默认的下载路径。\n\n\n\n```bash\nD:\\software\\cmder\\cmder\u003enpm config ls\n; cli configs\nmetrics-registry = "https://registry.npmjs.org/"\nscope = ""\nuser-agent = "npm/6.13.4 node/v12.14.0 win32 x64"\n\n; builtin config undefined\nprefix = "C:\\\\Users\\\\DELL\\\\AppData\\\\Roaming\\\\npm"\n\n; node bin location = D:\\SoftWareInstall\\nodejsIns\\node.exe\n; cwd = D:\\software\\cmder\\cmder\n; HOME = C:\\Users\\DELL\n; "npm config ls -l" to show all defaults.\n```\n\n注意，npm默认的下载路径在C:\\Users\\DELL\\AppData\\Roaming\\npm，其中AppData是隐藏文件夹，在【查看】菜单中勾选【隐藏的项目】才可以看到AppData文件夹。\n\n???\n\n```java\n// 更改npm默认的缓存路径\nnpm config set cache "D:\\TempDate\\nodedata\\cache"\n\n// 更改npm默认的下载路径\nnpm config set prefix "D:\\TempDate\\nodedata\\download"\n```\n\n更改缓存路径和下载路径后，再次查看\n\n\n\n```java\nD:\\software\\cmder\\cmder\u003enpm config ls\n\n; userconfig C:\\Users\\DELL\\.npmrc\ncache = "D:\\\\TempDate\\\\nodedata\\\\cache"\nprefix = "D:\\\\TempDate\\\\nodedata\\\\download"\n```\n\n\n\n那么下面来介绍一下,如何创建自己的第一个node模块,并把这个模块上传到npm上面,让别人可以用我们的模块\n# 创建第一个node模块\n\nNode.js模块就是发布到npm的代码包，\n\n\u003e 创建一个新模块的第一步就是创建一个package.json文件。\n\u003e 你可以用npm init来创建package.json文件。\n\u003e 这个过程中命令行会逐步提示你输入这个模块的信息，\n\u003e 其中模块的名字和版本号是必填项\n\n\n\u003e 你还需要一个入口文件，\n\u003e 如果你使用默认值的话，那就会是index.js.\n\u003e 创建完package.json文件之后，你就要开始写代码包里的内容了，\n\u003e 这里举个最简单的例子，在默认的index.js里写一个要导出的函数，\n\u003e 这个函数也就是别人的代码里可以import或者require的。\n\n```jsx\nexports.showMsg = function () {\n  console.log("This is my first module");\n};\n```\n\n这样的话,你的node模块就已经创建完成了\n\n### 如何发布到npm服务器上\n\n##### 注册一个npm账号\n\n##### 首次需要登录,**npm login** 存储证书到本地,后面就不需要每次都登录的\n\n登录需要输入用户名,密码,还有邮箱,这些都是刚刚注册时候填写的\n![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f734894dc3c6454782beea7542fb0945~tplv-k3u1fbpfcp-watermark.image)\n\n##### 开始发布\n\n**npm publish** 发布包\n\n\u003e 使用 cnpm 的注意报错：\n\u003e no_perms Private mode enable, only admin can publish this module\n\u003e 设置回原本的就可以了\n\u003e **npm config set registry [http://registry.npmjs.org](https://link.jianshu.com?t=http://registry.npmjs.org) **\n\u003e 发布完成之后,如果还想回到之前的cnpm,使用下面的命令\n\u003e **npm config set registry [https://registry.npm.taobao.org](https://link.jianshu.com?t=https://registry.npm.taobao.org)**\n\n### 创建一个案例,引用刚上传的包\n\n​\t\n\n\u003e 假设已经成功发布了，并且包名叫做**toniqian-test-module**，\n\u003e 这时候可以新建一个空目录，cd进去，运行npm install toniqian-test-module，然后在这个目录下会出现一个叫node_modules的文件夹，你之前写的包就会出现在这个文件夹下面。\n\n然后写一个index.js,代码如下\n\n\n\n```jsx\nvar test = require(\'toniqian-test-module\');\ntest.showMsg();\n```\n\n运行index.js\n\n\n\n```css\nnode index.js\n```\n\n那么刚刚上传的包,目前已经可以使用,到目前的话,\n你已经成功创建了一个npm包了\n\n### 如何更新npm包\n\n当你包的内容修改之后,比如\n\n\n\n```jsx\nexports.showMsg = function () {\n  console.log("This is my second module");\n};\n```\n\n\u003e 修改了提示文字,那么我们需要 **npm version \u003cupdate_type\u003e**\n\u003e **update_type**就是版本号的意思,会自动更新**package.json**里面的版本号\n\u003e 然后重新 **npm publish**,更新就会完成\n\n**作业** 实现一个相对时间转换函数\n\n```jsx\nmoment(time){\n  // 相对时间转换\n}\n```\n\n### 如何删除npm包\n\n```\nnpm unpublish kk-a-test --force\n```\n\n### 查看当前登录的npm账号\n\n```\nnpm whoami\n```\n\n输出 username\n\n# **发布包错误集锦**\n\n1、需要提高版本号\n\n\n\n```ruby\n#1、发包 npm publish 失败\nsh-neverleave:z-tool neverleave$ npm publish\nnpm ERR! publish Failed PUT 400\nnpm ERR! code E400\nnpm ERR! deprecations must be strings : z-tool\n\nnpm ERR! A complete log of this run can be found in:\nnpm ERR!     /Users/neverleave/.npm/_logs/2018-11-23T10_52_01_742Z-debug.log\nsh-neverleave:z-tool neverleave$ npm publish\n\n\n#2、发包 npm publish 失败\nsh-neverleave:z-tool neverleave$ npm publish\nnpm ERR! publish Failed PUT 403\nnpm ERR! code E403\nnpm ERR! You cannot publish over the previously published versions: 1.0.3. : z-tool\n\nnpm ERR! A complete log of this run can be found in:\nnpm ERR!     /Users/neverleave/.npm/_logs/2018-11-23T11_24_57_662Z-debug.log\nsh-neverleave:z-tool neverleave$ \n```\n\n2、发包 npm publish 失败\n 解决方案：终端执行： npm publish --access public\n\n参考：https://stackoverflow.com/questions/53420758/npm-publish-gives-unscoped-packages-cannot-be-private\n\n\n\n```ruby\n#1、发包 npm publish 失败\nsh-neverleave:npm neverleave$ npm publish\nnpm ERR! publish Failed PUT 400\nnpm ERR! code E400\nnpm ERR! unscoped packages cannot be private : z-tool\n\nnpm ERR! A complete log of this run can be found in:\nnpm ERR!     /Users/neverleave/.npm/_logs/2018-11-23T08_44_21_310Z-debug.log\nsh-neverleave:npm neverleave$ \n\n#解决方案：终端执行： npm publish --access public\nsh-neverleave:npm neverleave$ npm publish --access public\n+ z-tool@1.0.0\nsh-neverleave:npm neverleave$ \n```\n\n3、确保登录的用户账号正确\n\n\n\n```swift\nsh-neverleave:npm neverleave$ npm publish\nnpm ERR! publish Failed PUT 404\nnpm ERR! code E404\nnpm ERR! 404 User not found : z-tool\nnpm ERR! 404 \nnpm ERR! 404  \'z-tool\' is not in the npm registry.\nnpm ERR! 404 You should bug the author to publish it (or use the name yourself!)\nnpm ERR! 404 \nnpm ERR! 404 Note that you can also install from a\nnpm ERR! 404 tarball, folder, http url, or git url.\n\nnpm ERR! A complete log of this run can be found in:\nnpm ERR!     /Users/neverleave/.npm/_logs/2018-11-23T07_32_28_518Z-debug.log\n```\n\n4、登录时需要在username 前加‘~’，具体大家可以验证\n\n\n\n```kotlin\nsh-neverleave:npm neverleave$ npm login\nUsername: (~neverleave) neverleave\nPassword: (\u003cdefault hidden\u003e) \nEmail: (this IS public) (1063588359@qq.com) \nnpm ERR! code EAUTHIP\nnpm ERR! Unable to authenticate, need: Basic\n\nnpm ERR! A complete log of this run can be found in:\nnpm ERR!     /Users/neverleave/.npm/_logs/2018-11-23T07_27_50_877Z-debug.log\nsh-neverleave:npm neverleave$ \n```\n\n5、无权限删除线上的包（撤包有时间限制，24小时）\n 解决方案：加上 --force\n\n\n\n```bash\nsh-neverleave:z-tool neverleave$ npm unpublish z-tool\nnpm ERR! Refusing to delete entire project.\nnpm ERR! Run with --force to do this.\nnpm ERR! npm unpublish [\u003c@scope\u003e/]\u003cpkg\u003e[@\u003cversion\u003e]\nsh-neverleave:z-tool neverleave$ \n\n#解决方案（内部有被鄙视的话，😄 I sure hope you know what you are doing.）\nsh-neverleave:z-tool neverleave$ npm unpublish z-tool --force\nnpm WARN using --force I sure hope you know what you are doing.\n- z-tool\nsh-neverleave:z-tool neverleave$ \n```\n\n6、删除npm市场的包同名的24小时后才能重新发布\n\n\n\n```ruby\nsh-neverleave:z-tool neverleave$ npm publish\nnpm ERR! publish Failed PUT 403\nnpm ERR! code E403\nnpm ERR! z-tool cannot be republished until 24 hours have passed. : z-tool\n\nnpm ERR! A complete log of this run can be found in:\nnpm ERR!     /Users/neverleave/.npm/_logs/2018-11-23T11_41_24_086Z-debug.log\nsh-neverleave:z-tool neverleave$ \n```\n\n',
        tag_ids: [
          '6809637769959178254',
          '6809637767543259144',
          '6809635626879549454'
        ],
        title: '使用Express构建你的RESTful API'
      }
    }
  },
  methods: {
    change(value, render) {
      this.formData.html_content = render
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = cloneDeep(this.formData)
          updateAction(params)
          // publicAction(this.formData);
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
