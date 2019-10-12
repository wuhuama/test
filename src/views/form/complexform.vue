<template>
<div>
  用户名：<input type="text" v-model="name">
  密码：<input type="password" v-model="password" :readonly="isReadonly" @focus="isReadonly=false" @blur="isReadonly=true">
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      isReadonly: true
    }
  },
}
</script>