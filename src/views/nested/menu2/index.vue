<template>
  <el-row>
    <el-button

      type="primary"
      round
      :disabled="!hasPermission(permissionButton_add)"
    >权限按钮 新增</el-button>
    <el-button

      type="primary"
      round
      :disabled="!hasPermission(permissionButton_delete)"
    >权限按钮 删除</el-button>
  </el-row>
</template>

<script>
import { hasPermission as hasPerm } from '@/utils/validate'

export default {
  name: 'Menu2',
  data() {
    return {
      permissionButton_add: '1_2_01', // 权限按钮 新增
      permissionButton_delete: '1_2_02' // 权限按钮 删除
    }
  },
  computed: {

  },
  methods: {
    hasPermission(id) {
      return hasPerm(id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
