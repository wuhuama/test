<template>
    <div class="form-wraper">
        <i-form :model="formValidate" :rules="ruleValidate">
            <i-form-item label="用户名" prop="name">
                <input type="text" v-model="formValidate.name">
            </i-form-item>
            <i-form-item label="邮箱" prop="email">
                <input type="text" v-model="formValidate.email">
            </i-form-item>
            <el-date-picker type="date" value-format="timestamp" v-model="form.birthDate" placeholder="选择日期" class="display-block" :picker-options="pickerBeginDateBefore"></el-date-picker>

            <i-form-item label="入住日期" class="inline">
              <el-date-picker value-format="timestamp" v-model="params.startDate" type="date" :picker-options="pickerBeginDateBefore" placeholder="选择日期">
              </el-date-picker>
              <span class="item-font">至</span>
              <el-date-picker value-format="timestamp" v-model="params.endDate" type="date" :picker-options="pickerBeginDateAfter" placeholder="选择日期">
              </el-date-picker>

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
            },
            form: {
                birthDate: null
            },
            //放在data中的
            pickerBeginDateBefore: {
                disabledDate: time => {
                let _now = Date.now();
                    return time.getTime() > _now;
                }
            },
            params: {
                startDate: null,
                endDate: null
            },
            //data中的
            pickerBeginDateBefore: {
                disabledDate: time => {
                let beginDateVal = this.params.endDate;
                if (beginDateVal) {
                    return time.getTime() > beginDateVal;
                }
                }
            },
            pickerBeginDateAfter: {
                disabledDate: time => {
                let beginDateVal = this.params.startDate;
                if (beginDateVal) {
                    return time.getTime() < beginDateVal;
                }
                }
            }
        }
    },
    components: {
        iForm,
        iFormItem
    }
}
</script>