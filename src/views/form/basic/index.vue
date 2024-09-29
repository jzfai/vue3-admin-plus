<template>
	<div class="basic-form-wrap">
		<div class="mt-8-4 mb-8-3">
			Form Demo
		</div>
		<div class="form-content">
			<el-form
					ref="formRef"
					:model="formInline"
					label-position="top"
			>
				<template
						v-for="v in asyncFormList"
						:key="v['key']"
				>
					<el-form-item
							:prop="v['key']"
							:rules="[{validator:validators[v['validator']],trigger:v['validateTrigger']||'change'}]"
							:label="v['label']"
					>
						<el-select
								v-if="v['type']==='select'"
								v-model="formInline[v['key']]"
								:filterable="v['filterable']"
								:clearable="v['clearable']"
						>
							<el-option
									v-for="v in v['options']"
									:label="v['label']"
									:value="v['value']"
									:key="v['value']"
							>
								{{ v['label'] }}
							</el-option>
						</el-select>
						<el-input
								v-if="v['type']==='input'"
								v-model="formInline[v['key']]"
								:clearable="v['clearable']"
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
import {asyncFormList} from '@/views/form/config'
import validators from '@/views/form/validators'
import {ElMessage} from 'element-plus'

const formRef: Ref<HTMLFormElement | null> = ref(null)
const formInline = reactive({})

const handleSubmit = () => {
	formRef.value && formRef.value.validate((valid: boolean) => {
		if (valid) {
			ElMessage.success('Success')
			formRef.value && formRef.value.resetFields()
		}
	})
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
