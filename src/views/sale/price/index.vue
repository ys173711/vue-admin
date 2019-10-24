<template>
  <div style="padding:30px;">
    <el-alert :closable="false" :title="title" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'Price',
  data() {
    return {
      title: this.$route.meta.title
    }
  }
}
</script>
