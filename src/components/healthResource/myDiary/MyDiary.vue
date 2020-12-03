<template>
  <div>
    <a-row style="margin: 30px">
      <a-col :span="4">
        <a-input-search
          placeholder="日记日期"
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="4" :push="18">
        <a-button type="primary" @click="addDiary">添加日记</a-button>
      </a-col>
    </a-row>
    <a-modal
      title="添加管理"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="addUserInfo"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="日记id" prop="diaryId">
          <a-input
            placeholder="请输入日记id"
            v-model="addUserInfo.diaryId"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="日记日期" prop="diaryDate">
          <a-input
            placeholder="请输入日记日期"
            v-model="addUserInfo.diaryDate"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="日记标题" prop="diaryTitle">
          <a-input
            placeholder="请输入日记标题"
            v-model="addUserInfo.diaryTitle"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="日记内容" prop="diaryContent">
          <a-input
            placeholder="请输入日记内容"
            v-model="addUserInfo.diaryContent"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="完成状态" prop="diaryState">
          <a-input
            placeholder="请输入日记完成状态"
            v-model="addUserInfo.diaryState"
          ></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      style="margin: 10px"
      rowKey="diaryId"
      :row-selection="rowSelection"
    >
      <template
        v-for="col in ['diaryDate', 'diaryTitle', 'diaryContent']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.diaryId, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.diaryId)">保存修改</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.diaryId)"
            >
              <a>取消修改</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.diaryId)"
              >修改信息</a
            >
            <a
              :disabled="editingKey !== ''"
              @click="() => deleteItem(record.diaryId)"
              >删除</a
            >
            <a
              :disabled="editingKey !== ''"
              @click="() => changestate(record.diaryId)"
              >修改状态</a
            >
          </span>
        </div>
      </template>
      <template #diaryState="text">
        <a-tag color="#388e3c" v-if="text">已完成</a-tag>
        <a-tag color="#ff5252" v-else>未完成</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "日记编号",
    align: "center",
    dataIndex: "diaryId",
  },
  {
    title: "日记日期",
    align: "center",
    dataIndex: "diaryDate",
    scopedSlots: { customRender: "diaryDate" },
  },
  {
    title: "日记标题",
    align: "center",
    dataIndex: "diaryTitle",
    scopedSlots: { customRender: "diaryTitle" },
  },
  {
    title: "日记内容",
    align: "center",
    dataIndex: "diaryContent",
    scopedSlots: { customRender: "diaryContent" },
  },
  {
    title: "完成状态",
    align: "center",
    dataIndex: "diaryState",
    scopedSlots: { customRender: "diaryState" },
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [
  {
    diaryId: "d01",
    diaryDate: "2020-06-07",
    diaryTitle: "我的第一个日记",
    diaryContent: "今天又是憨批的一天呢",
    diaryState: true,
  },
  {
    diaryId: "d02",
    diaryDate: "2020-06-07",
    diaryTitle: "我的第一个日记",
    diaryContent: "今天又是憨批的一天呢",
    diaryState: true,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record);
    console.log(selected);
    console.log(selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    // console.log(selected, selectedRows, changeRows);
  },
};
export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      editingKey: "",
      rowSelection,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      rules: {
        diaryId: [
          {
            required: true,
            min: 2,
            message: "id为d开头的数字编号",
          },
        ],
        diaryDate: [
          {
            required: true,
            message: "日记日期不能为空",
          },
        ],
        diaryTitle: [
          {
            required: true,
            min: 1,
            message: "日记标题不能为空",
          },
        ],
        diaryContent: [
          {
            required: true,
            min: 1,
            message: "请输入日记内容",
          },
        ],
        diaryState: [
          {
            required: true,
            message: "输入日记完成状态为0或1",
          },
        ],
      },
      addUserInfo: {
        diaryId: "",
        diaryDate: "",
        diaryTitle: "",
        diaryContent: "",
        diaryState: "",
      },
    };
  },
  methods: {
    onSearch() {},
    addDiary() {
      console.log("addAdmin");
      this.visible = true;
    },
    handleOk() {
      // console.log("Clicked ok button");
      // console.log(this.addUserInfo);
      let id = this.addUserInfo.diaryId;
      let date = this.addUserInfo.diaryDate;
      let title = this.addUserInfo.diaryTitle;
      let content = this.addUserInfo.diaryContent;
      let state = Boolean(Number(this.addUserInfo.diaryState));
      // console.log(typeof state);
      // console.log(state);

      let diary = {
        diaryId: id,
        diaryDate: date,
        diaryTitle: title,
        diaryContent: content,
        diaryState: state,
      };
      this.data.push(diary);
      // console.log(this.userInfoList);
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.addUserInfo.diaryId = "";
        this.addUserInfo.diaryDate = "";
        this.addUserInfo.diaryTitle= "";
        this.addUserInfo.diaryContent = "";
        this.addUserInfo.diaryState = "";
      }, 2000);
      this.$message.success("添加成功", 10);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.diaryId)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      // console.log(newData);
      const target = newData.filter((item) => key === item.diaryId)[0];
      console.log(target);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    deleteItem(key) {
      console.log(key);
      this.$message.success("删除成功", 10);
    },
    changestate(key) {
      console.log(key);
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.diaryId)[0];
      const targetCache = newCacheData.filter(
        (item) => key === item.diaryId
      )[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
      this.$message.success("修改成功", 10);
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.diaryId)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.diaryId)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
  },
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>