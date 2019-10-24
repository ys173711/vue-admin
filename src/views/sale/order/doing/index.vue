<template>
  <div style="padding:30px;">
    <el-alert :closable="false" :title="title">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'Doing',
  data() {
    return {
      title: this.$route.meta.title
    }
  }
}
</script>
