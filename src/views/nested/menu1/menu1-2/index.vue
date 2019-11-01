<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'Menu1c2'
}
</script>
