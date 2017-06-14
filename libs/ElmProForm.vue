<template>
  <el-form
    ref="el-form"
    :model="formData"
    :rules="valids"
    label-position="right"
    label-width="120px">
    <el-form-item
      v-for="(item, key) in fields"
      :key="key"
      :label="item.text"
      :prop="item.field"
      :required="item.required">
      <el-input
        v-if="item.type === 'input' || item.type === 'password' || item.type === 'textarea'"
        :type="item.type === 'input' ? 'text' : item.type"
        :autosize="{minRows: 2, maxRows: 2}"
        :disabled="item.disabled"
        v-model="formData[item.field]"
        @change="item.change">
      </el-input>
      <el-select
        v-if="item.type === 'select'"
        v-model="formData[item.field]"
        :disabled="item.disabled"
        @change="item.change"
        placeholder="请选择">
        <el-option
          v-for="(it, k) in item.options"
          :key="k"
          :disabled="it.disabled"
          :label="it.label"
          :value="it.value">
        </el-option>
      </el-select>
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="formData[item.field]"
        @change="item.change">
        <el-radio
          v-for="(it, k) in item.options"
          :key="k"
          :disabled="item.disabled || it.disabled"
          :label="it.value">
          {{it.label}}
        </el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-if="item.type === 'checkbox'"
        v-model="formData[item.field]"
        @change="item.change">
        <el-checkbox
          v-for="(it, k) in item.options"
          :key="k"
          :disabled="item.disabled || it.disabled"
          :label="it.value">{{it.label}}</el-checkbox>
      </el-checkbox-group>
      <el-tree
        v-if="item.type === 'tree'"
        :data="item.options"
        show-checkbox
        node-key="id"
        :ref="item.field"
        :default-checked-keys="formData[item.field]"
        highlight-current>
      </el-tree>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <el-button
          type="primary"
           @click="onSubmit">
          确定
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { Form, FormItem, Input, Select, Option, RadioGroup, Radio, CheckboxGroup, Checkbox, Tree, Row, Col, Button, Message } from 'element-ui';
import rules from '../utils/rules';

let patterns = {
    email: {
      test: rules.isEmail,
      msg: '请输入正确的邮箱格式'
    },
    phone: {
      test: rules.isPhone,
      msg: '请输入正确的手机号码格式'
    },
    number: {
      test: rules.isNumber,
      msg: '请输入数值'
    }
};

let trigger = function (type) {
  let event = '';
  switch (type) {
    case 'input':
    case 'password':
      event = 'blur';
      break;
    default:
      event = 'change';
      break;
  }
  return event;
};

export default {
  name: 'elm-pro-form',
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input,
    elSelect: Select,
    elOption: Option,
    elRadioGroup: RadioGroup,
    elRadio: Radio,
    elCheckboxGroup: CheckboxGroup,
    elCheckbox: Checkbox,
    elTree: Tree,
    elRow: Row,
    elCol: Col,
    elButton: Button
  },
  props: {
    options: {
      type: Object,
      required: true,
      validator: function (options) {
        if (!options.initValues || !rules.isObject(options.initValues)) {
          throw new Error('ProForm\'s submitFn must be a Object');
        }
        if (!options.submitFn) {
          throw new Error('ProForm\'s submitFn must not be null');
        }
        if (!options.fields || !rules.isArray(options.fields)) {
          throw new Error('ProForm\'s fields must be an Array');
        }
        return true;
      }
    }
  },
  computed: {
    fields() {
      let fields = this.options.fields || [];
      fields.forEach((val, key) => {
        val.change = val.change ? val.change : () => {};
      });
      return fields;
    },
    valids() {
      let valids = {};
      let fields = this.fields;
      fields.forEach((val, key) => {
        if (!valids[val.field]) {
            valids[val.field] = [];
        }
        if (val.required) {
          valids[val.field].push({
            validator: (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入' + val.text));
                } else {
                    callback();
                }
            },
            trigger: trigger(val.type)
          });
        }
        if (rules.isString(val.pattern) && patterns[val.pattern]) {
          /**
           * email 邮箱格式校验
           * phone 手机号格式校验
           */
          let patt = patterns[val.pattern];
          valids[val.field].push({
            validator: (rule, value, callback) => {
              if (value === '') {
                callback();
              } else if (!patt.test(value)) {
                callback(new Error(patt.msg));
              } else {
                callback();
              }
            },
            trigger: trigger(val.type)
          });
        } else if(val.pattern && !rules.isEmptyObject(val.pattern)){
          /**
           * type 输入类型 number
           * maxlen 最大长度
           * minlen 最小长度
           * max 最大值
           * min 最小值
           */
          let otherPatterns = {
            maxlen: {
              test: (value, maxlen) => { return value.length <= maxlen; },
              msg: maxlen => '最多只能输入' + maxlen + '个字符'
            },
            minlen: {
              test: (value, minlen) => { return value.length >= minlen; },
              msg: minlen => '最少要输入' + minlen + '个字符'
            },
            max: {
              test: (value, max) => { return value <= max; },
              msg: max => '输入的值不得大于' + max
            },
            min: {
              test: (value, min) => { return value >= min; },
              msg: min => '输入的值不得小于' + min
            }
          };
          if (val.pattern.type === 'number') {
            let patt = patterns.number;
            valids[val.field].push({
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback();
                } else if (!patt.test(value)) {
                  callback(patt.msg);
                } else {
                  callback();
                }
              },
              trigger: trigger(val.type)
            });
          }
          Object.keys(otherPatterns).forEach((it, key) => {
            if (val.pattern[it] !== undefined) {
              let patt = otherPatterns[it];
              valids[val.field].push({
                validator: (rule, value, callback) => {
                  if (value === '') {
                    callback();
                  } else if (!patt.test(value, val.pattern[it])) {
                    callback(patt.msg(val.pattern[it]));
                  } else {
                    callback();
                  }
                },
                trigger: trigger(val.type)
              });
            }
          });
        }
      });
      return valids;
    }
  },
  mounted() {
      let trees = this.fields.filter((val, key) => {
        return val.type === 'tree';
      });
      // tree 类型特别处理
      setTimeout(() => {
        trees.forEach((val, key) => {
          let value = this.formData[val.field];
          this.$refs[val.field][0].setCheckedKeys(value);
        });
      }, 1000);
  },
  data() {
    return {
      formData: this.options.initValues || {}
    };
  },
  methods: {
    onSubmit() {
      this.$refs['el-form'].validate(valid => {
        if (valid) {
          // 对 tree 类型特殊处理
          let trees = this.fields.filter((val, key) => {
            return val.type === 'tree';
          });
          let flag = false;
          trees.forEach((val, key) => {
            let value = this.$refs[val.field][0].getCheckedKeys();
            this.formData[val.field] = value;
            if (val.required && value.length === 0 && flag === false) {
              flag = true;
              Message.error('请选择' + val.text);
            }
          });
          if (flag) {
            return false;
          }

          this.options.submitFn(this.formData);
        } else {
          return false;
        }
      });
    },
    reset() {
      let trees = this.fields.filter((val, key) => {
        return val.type === 'tree';
      });
      trees.forEach((val, key) => {
        this.$refs[val.field][0].setCheckedKeys([]);
      });
      this.$refs['el-form'].resetFields();
    }
  }
};
</script>
