<template>
  <div class="example-simple">
    <div class="upload">
      <v-btn style="position:relative;top:-3px;"
             v-show="disabled"
             disabled>上传中</v-btn>
      <div v-show="!disabled"
           class="example-btn">
        <file-upload class="btn btn-primary ma-2"
                     :headers="token"
                     :post-action="url"
                     :multiple="true"
                     :size="1024 * 1024 * 10"
                     v-model="files"
                     @input-filter="inputFilter"
                     @input-file="inputFile"
                     ref="upload">
          <i class="fa fa-plus"></i>
          <v-btn class="ma-2"
                 tile
                 color="indigo"
                 dark>{{txt}}</v-btn>
        </file-upload>
      </div>
    </div>
  </div>
</template>
<style>
.example-simple label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>

<script>
import FileUpload from "vue-upload-component";
export default {
  props: {
    url: {
      type: String,
      default: null
    },
    txt: {
      type: String,
      default: '上传'
    },
    token:{}
  },
  components: {
    FileUpload
  },

  data () {
    return {
      files: [],
      disabled: false,
    };
  },
  mounted () {
  },

  methods: {
    inputFilter (newFile, oldFile, prevent) {
      // if (newFile && !oldFile) {
      //   // Before adding a file
      //   // 添加文件前

      //   // Filter system files or hide files
      //   // 过滤系统文件 和隐藏文件
      //   if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
      //     return prevent();
      //   }

      //   // Filter php html js file
      //   // 过滤 php html js 文件
      //   if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
      //     return prevent();
      //   }
      // }
    },

    inputFile (newFile, oldFile) {
      this.$refs.upload.active = true;
      // console.log(newFile, oldFile);
      if (newFile && !oldFile) {
        this.disabled = true;
      }
      // if (newFile && oldFile) {
      //   // update
      //   console.log("update", newFile);
      // }

      // if (!newFile && oldFile) {
      //   // remove
      //   console.log("remove", oldFile);
      // }

      // if (newFile.progress !== oldFile.progress) {
      //   // progress

      // RESULT_SUCCESS
      // RESULT_ERROR
      // }
      if (newFile.error && !oldFile.error) {
        this.disabled = false;
        this.$emit('on-error', '上传失败')
      }
      if (newFile.success && !oldFile.success) {
        // success
        if (oldFile.response.resultCode === "RESULT_SUCCESS") {
          this.disabled = false;
          this.$emit('on-complete', oldFile.response.message);
        }
        if (oldFile.response.resultCode === "RESULT_ERROR") {
          this.disabled = false;
          this.$emit('on-error', oldFile.response.message);
        }
      }
    }
  }
};
</script>
<style scoped>
.example-btn {
  cursor: pointer;
}
</style>

<style>
.example-btn .ma-2 {
  margin: 0px !important;
}
</style>
