<template>
  <div class="container">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="上传单个文件">
        <el-input type="file" v-model="formLabelAlign.file" style="position:absolute;z-index:99;opacity:0;" @change="uploadFile1" id="fileInput1"></el-input>
        <el-input v-model="formLabelAlign.fileName" placeholder="请选择文件"></el-input>
      </el-form-item>
      <el-form-item label="上传多个文件">
        <el-input type="file" multiple v-model="formLabelAlign.fileList" style="position:absolute;z-index:99;opacity:0;" @change="uploadFile2" id="fileInput2"></el-input>
        <el-input v-model="formLabelAlign.fileName" placeholder="请选择文件"></el-input>
      </el-form-item>
      <ul class="upload-list">
        <li class="el-upload-list__item is-finished" v-for="(item, index) in fileList" :key="index" :index="index">{{item.name}}
          <i class="el-icon-close" @click="deleteFile(index)"></i>
        </li>
      </ul>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      fileList: [],
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        file: null,
        fileName: ''
      }
    };
  },
  mounted() {
    this.getKey()
  },
  methods: {
    getKey () {
      this.$http.get('/getkey').then(res => {
        console.log(res);
      }).catch(error=>{
        // console.log(`error ${error}`);
      })
    },
    uploadFile1 (file) {
      console.log(file);
      let dom = document.getElementById('fileInput1')
      let files = dom.files
      console.log(files);
      if (files.length != 0) {
        this.formLabelAlign.fileName = files[0].name
        this.formLabelAlign.file = files[0]
      }
    },
    uploadFile2 () {
      let dom = document.getElementById('fileInput2')
      let files = dom.files
      console.log(files);
      this.fileList = files
      for (const item of files) {
        let size = item.size/1024/1024
        if (size > 2) {
          this.$message('文件最大不能超过2M!')
        }
      }
    },
  },
}
</script>
<style lang="">
  .container {
    width: 50%;
    margin: 0 auto;
  }
  .upload-list {
    padding-left: 100px;
  }
  .upload-list li {
    list-style: none;
  }
</style>