<template>
	<div class="basic-form-wrap">
		<div class="mt-8-4 mb-8-3">
			Dynamic Regular Form
			<br/>
			This is a demo of an asynchronous loading form configuration, where components are related to each other, for example, when you select certain currencies, additional input fields will appear, and the regular expression of the input field supports dynamic loading. Hopefully, this demo will help you get your development work done faster
		</div>
		<div class="form-content">
			<el-form
					ref="formRef"
					:model="formInline"
					label-position="top"
			>
				<template
						v-for="v in asyncRegFormList"
						:key="v['key']"
				>
					<el-form-item
							v-if="v['type']==='select'&&filterAssert(v)"
							:prop="v['key']"
							:rules="[{
								validator: (rule: any, value: any, callback: any)=>validateField(v,rule,value,callback),
                trigger: v['trigger']||'blur'
							}]"
							:label="v['label'][locale]"
					>
						<el-select
								v-model="formInline[v['key']]"
								:placeholder="v['placeholder'][locale]"
								:filterable="v['filterable']"
								:clearable="v['clearable']"
								:size="v['size']||'default'"
								:style="v['style']||{}"
						>
							<el-option
									v-for="v in v['options']"
									:label="v['label'][locale]"
									:value="v['value']"
									:key="v['value']"
							>
								{{ v['label'][locale] }}
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item
							v-if="v['type']==='input'&&filterAssert(v)"
							:prop="v['key']"
							:rules="[{
								validator: (rule: any, value: any, callback: any)=>validateField(v,rule,value,callback),
                trigger: v['trigger']||'blur'
							}]"
							:label="v['label'][locale]"
					>
						<el-input
								v-model="formInline[v['key']]"
								:type="v['inputType']"
								:rows="v['inputRows']||undefined"
								:placeholder="v['placeholder'][locale]"
								:maxlength="v['manxLength']||64"
								:clearable="v['clearable']"
								:size="v['size']||'default'"
								:style="v['style']||{}"
						/>
					</el-form-item>
				</template>
			</el-form>
		</div>
		<div class="actions d-flex a-center j-start">
			<el-button
					type="primary"
					@click="handleSubmit"
			>
				Submit
			</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import {Ref} from 'vue'
import {asyncRegFormList} from '@/views/form/config'
import validators from '@/views/form/validators'
import {useI18n} from 'vue-i18n'
import {ElMessage} from 'element-plus'

const {locale} = useI18n()
const formRef: Ref<HTMLFormElement | null> = ref(null)
const formInline = reactive({})

const handleSubmit = () => {
	formRef.value && formRef.value.validate((valid: boolean) => {
		console.log(valid)
		if (valid) {
			ElMessage.success('Success')
			formRef.value && formRef.value.resetFields()
		}
	})
}
const filterAssert = (conf) => {
	if (!conf['basicAssert']) return true
	return conf['basicAssert']['values'].includes(formInline[conf['basicAssert']['key']])
}
const validateField = (item: any, rule: any, value: any, callback: (err?: Error) => void): void => {
	if (!item.required) {
		callback()
	} else {
		if (value || value === 0) {
			if (item.reg) {
				if (new RegExp(item.reg).test(value)) {
					callback()
				} else {
					callback(new Error(item['errorMessage'][locale.value]))
				}
			} else {
				callback()
			}
		} else {
			callback(new Error(item['blankErrorMessage'][locale.value] || 'This field is required.'))
		}
	}
}
</script>

<style scoped lang="scss">
.basic-form-wrap {
	.form-content,
	.actions {
		width: 50%;
	}
}
</style>
