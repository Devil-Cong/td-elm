<template>
  <div class="elm-info-view">
    <el-col
      v-for="(item, key) in options.fields"
      :key="key"
      class="block"
      :span="item.colspan || colspan">
      <div
        class="label"
        :style="'width:' + labelWidth">
        {{item.label}}：
      </div>
      <div class="content">{{format(item.field)}}</div>
    </el-col>
  </div>
</template>

<script>
import { Col } from 'element-ui';
import rules from '../../utils/rules';
export default {
  name: 'elm-info-view',
  components: {
    elCol: Col
  },
  props: {
    options: {
      type: Object,
      required: true,
      validator: function (options) {
        if (!options.fields || !rules.isArray(options.fields)) {
          throw new Error('ProForm\'s fields must be an Array');
        }
        return true;
      }
    }
  },
  data() {
    return {
      colspan: this.options.colspan || 8,
      labelWidth: this.options.labelWidth || '120px'
    }
  },
  computed: {
    data: function() {
      return this.options.data || {}
    }
  },
  methods: {
    format(field) {
      let fields = field.split('.');
      let value = Object.assign({}, this.data);
      fields.forEach((val, key) => {
        value = value ? value[val] : '';
      });
      return value;
    },
  }
}
</script>

<style>
.elm-info-view {
  margin-top: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}
.elm-info-view .block{
  margin-top: 5px;
  margin-bottom: 5px;
}
.elm-info-view .label {
  display: table-cell;
  text-align: right;
  color: #99a9bf;
  padding-right: 5px;
  font-size: 14px;
}
.elm-info-view .content {
  display: table-cell;
  font-size: 14px;
}
</style>
