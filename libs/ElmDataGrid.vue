<template>
  <div>
    <div class="elm-tools">
      <el-input
        v-if="options.search"
        v-model="params.search"
        @change="searchChange"
        icon="search"
        size="small"
        :style="'width: ' + options.search.width || '160px'"
        :placeholder="options.search.placeholder || '请输入搜索内容'">
      </el-input>
      <el-button
        v-if="options.headBtns"
        v-for="(item, key) in options.headBtns"
        :key="key"
        :type="item.type"
        size="small"
        @click="item.fn">
        {{item.label || '按钮'}}
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        v-for="(item, key) in options.contents"
        v-if="item.button === true"
        :key="key"
        :label="item.text">
        <template scope="scope">
          <el-button
            v-for="(it, k) in item.content"
            :key="k"
            size="mini"
            :type="it.type"
            @click="it.fn(scope.$index, scope.row)">
            {{it.label || '按钮'}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="key"
        :label="item.text"
        :formatter="format(item)">
      </el-table-column>
    </el-table>
    <div class="elm-pagn">
      <el-pagination
        @current-change="goPage"
        :current-page="pageInfo.currentPage"
        layout="total, prev, pager, next"
        :page-size="params.size"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Pagination, Input } from 'element-ui';
export default {
  name: 'elm-data-grid',
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elButton: Button,
    elPagination: Pagination,
    elInput: Input
  },
  props: {
    options: {
      type: Object,
      required: true,
      validator: function (options) {
          if (!options.dataApi) {
              throw new Error('ElmDataGrid\'s dataApi must not be null');
          }
          if (!options.apiCallback) {
            throw new Error('ElmDataGrid\'s apiCallback must not be null');
          }
          if (!options.contents) {
              throw new Error('ElmDataGrid\'s contents must not be null');
          }
          return true;
      }
    }
  },
  created() {
    this.initParams();
    this.goPage(1);
  },
  data() {
    return {
      tableData: [],
      defParams: {
        page: 1,
        size: 20
      },
      params: {},
      pageInfo: {
        currentPage: 1,
        lastPage: 1,
        total: 0
      },
      timer: null
    }
  },
  methods: {
    initParams() {
      this.params = Object.assign({}, this.defParams, this.options.params);
    },
    goPage(page) {
      this.params.page = page;
      this.getData(this.params);
    },
    getData(data) {
      let params = JSON.parse(JSON.stringify(data));
      let api = this.options.dataApi;
      let hanlder = this.options.apiCallback;
      api(params).then(result => {
        let res = hanlder(result);
        if (res) {
          this.pageInfo.currentPage = params.page;
          this.pageInfo.total = res.total || 0;
          this.pageInfo.lastPage = Math.ceil(this.pageInfo.total / params.size);
          this.tableData = res.rows || [];
        }
      });
    },
    format(item) {
      let fields = item.content.split('.');
      return (row, col) => {
        let value = row;
        fields.forEach((val, key) => {
          value = value ? value[val] : '';
        });
        return value;
      };
    },
    searchChange() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getData(this.params);
      }, 500);
    }
  }
}
</script>

<style scoped>
.elm-pagn {
  margin-top: 10px;
  float: right;
}
.elm-tools {
  margin-bottom: 10px;
}
.el-input {
    width: 160px;
    margin-right: 10px;
}
</style>
