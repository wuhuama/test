<template>
    <div class="form-wraper">
        <i-form :model="formValidate" :rules="ruleValidate">
            <i-form-item label="用户名" prop="name">
                <input type="text" v-model="formValidate.name">
            </i-form-item>
            <i-form-item label="邮箱" prop="email">
                <input type="text" v-model="formValidate.email">
            </i-form-item>
            <i-form-item>
                <button type="button">提交</button>
            </i-form-item>
        </i-form>
    </div>
</template>
<script>
import iForm from '@/components/form/form'
import iFormItem from '@/components/form/form-item'
export default {
    name: 'aorm',
    data() {
        return {
            formValidate: {
                name: '',
                email: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        iForm,
        iFormItem
    }
}
</script>