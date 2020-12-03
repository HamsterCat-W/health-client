<template>
  <div>
    <a-row style="margin: 30px">
      <a-col :span="4">
        <a-input-search
          placeholder="用户编号"
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="4" :push="16">
        <a-button type="primary" @click="addAdmin">添加管理</a-button>
        <a-button
          type="primary"
          style="margin-left: 10px"
          @click="() => disabledAdmin()"
          >冻结管理</a-button
        >
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
        <a-form-model-item label="用户id" prop="userId">
          <a-input
            placeholder="请输入id"
            v-model="addUserInfo.userId"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="用户名" prop="userName">
          <a-input
            placeholder="请输入用户名"
            v-model="addUserInfo.userName"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input
            placeholder="请输入密码"
            v-model="addUserInfo.password"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="userEmail">
          <a-input
            placeholder="请输入邮箱"
            v-model="addUserInfo.userEmail"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="userTel">
          <a-input
            placeholder="请输入联系电话"
            v-model="addUserInfo.userTel"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="用户状态" prop="userState">
          <a-input
            placeholder="请输入用户状态"
            v-model="addUserInfo.userState"
          ></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      style="margin: 10px"
      rowKey="id"
      :row-selection="rowSelection"
    >
      <template
        v-for="col in ['username', 'password', 'email', 'tel']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">保存修改</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.id)"
            >
              <a>取消修改</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.id)"
              >修改信息</a
            >
            <a
              :disabled="editingKey !== ''"
              @click="() => deleteItem(record.id)"
              >删除</a
            >
            <a
              :disabled="editingKey !== ''"
              @click="() => changestate(record.id)"
              >修改状态</a
            >
          </span>
        </div>
      </template>
      <template #state="text">
        <a-tag color="#388e3c" v-if="text">已启用</a-tag>
        <a-tag color="#ff5252" v-else>已禁用</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "用户编号",
    width: "10%",
    align: "center",
    dataIndex: "id",
    scopedSlots: { customRender: "username" },
  },
  {
    title: "用户名",
    width: "13%",
    align: "center",
    dataIndex: "username",
    scopedSlots: { customRender: "username" },
  },
  {
    title: "密码",
    width: "13%",
    align: "center",
    dataIndex: "password",
    scopedSlots: { customRender: "password" },
  },
  {
    title: "邮箱",
    width: "13%",
    align: "center",
    dataIndex: "email",
    scopedSlots: { customRender: "email" },
  },
  {
    title: "联系电话",
    width: "13%",
    align: "center",
    dataIndex: "tel",
    scopedSlots: { customRender: "tel" },
  },
  {
    title: "当前状态",
    width: "13%",
    align: "center",
    dataIndex: "state",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "操作",
    width: "17%",
    align: "center",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    id: `h1${i}`.toString(),
    username: `hhh${i} `,
    password: 12345678,
    email: "2756878164@qq.com",
    tel: "1234567890",
    state: true,
  });
}

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
        userId: [
          {
            required: true,
            min: 3,
            message: "id为h开头的2位数字编号",
          },
        ],
        userName: [
          {
            required: true,
            min: 3,
            message: "用户名最少3个字符",
          },
        ],
        password: [
          {
            required: true,
            min: 6,
            message: "密码最少6个字符",
          },
        ],
        userEmail: [
          {
            required: true,
            message: "邮箱不能为空",
          },
        ],
        userTel: [
          {
            required: true,
            min: 11,
            message: "请输入正确电话号码",
          },
        ],
        userState: [
          {
            required: true,
            message: "输入用户状态为0或1",
          },
        ],
      },
      addUserInfo: {
        userId: "",
        userName: "",
        password: "",
        userEmail: "",
        userTel: "",
        userState: "",
      },
    };
  },
  methods: {
    onSearch() {},
    addAdmin() {
      console.log("addAdmin");
      this.visible = true;
    },
    disabledAdmin() {
      console.log("冻结用户");
      this.$message.success("冻结成功", 10);
    },
    handleOk() {
      // console.log("Clicked ok button");
      // console.log(this.addUserInfo);
      let id = this.addUserInfo.userId;
      let name = this.addUserInfo.userNickname;
      let password = this.addUserInfo.password;
      let email = this.addUserInfo.userEmail;
      let tel = this.addUserInfo.userTel;
      let state = Boolean(Number(this.addUserInfo.userState));
      console.log(typeof state);
      console.log(state);

      let user = {
        id: id,
        username: name,
        password: password,
        email: email,
        tel: tel,
        state: state,
      };
      this.data.push(user);
      // console.log(this.userInfoList);
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.addUserInfo.userId = "";
        this.addUserInfo.userName = "";
        this.addUserInfo.password = "";
        this.addUserInfo.userEmail = "";
        (this.addUserInfo.userTel = ""), (this.addUserInfo.userState = "");
      }, 2000);
      this.$message.success("添加成功", 10);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      // console.log(newData);
      const target = newData.filter((item) => key === item.id)[0];
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
      this.$message.success("修改成功", 10);
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.id)[0];
      const targetCache = newCacheData.filter((item) => key === item.id)[0];
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
      const target = newData.filter((item) => key === item.id)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.id)[0]
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