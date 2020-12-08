<template>
  <div>
    <a-row style="margin: 30px">
      <a-col :span="4">
        <a-input-search
          placeholder="用户编号"
          enter-button
          @search="onSearch"
          v-model="userId"
        />
      </a-col>
      <a-col :span="4" :push="18">
        <a-button type="primary" @click="addAdmin">添加管理</a-button>
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
      rowKey="userId"
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
            @change="(e) => handleChange(e.target.value, record.userId, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.userId)">保存修改</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.userId)"
            >
              <a>取消修改</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.userId)"
              >修改信息</a
            >
            <a
              :disabled="editingKey !== ''"
              @click="() => deleteItem(record.userId)"
              >删除</a
            >
            <a :disabled="editingKey !== ''" @click="() => changestate(record)"
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
import axios from "axios";
const columns = [
  {
    title: "用户编号",
    width: "10%",
    align: "center",
    dataIndex: "userId",
    scopedSlots: { customRender: "userId" },
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
    dataIndex: "userState",
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

const url = "http://localhost:9000";

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
      url,
      userId: "",
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
  mounted() {
    this.data = [];
    let that = this;
    axios.get(`${url}/user`).then(
      function (res) {
        for (let item of res.data) {
          // console.log(item);
          if (item.userRole === true) that.data.push(item);
        }
      },
      function (err) {
        console(err);
      }
    );
  },
  methods: {
    onSearch() {
      let that = this;
      axios.get(`${this.url}/user/${this.userId}`).then(
        function (res) {
          console.log(res);
          let da = [];
          da.push(res.data);
          that.data = da;
        },
        function (err) {}
      );
    },
    addAdmin() {
      console.log("addAdmin");
      this.visible = true;
    },
    handleOk() {
      // console.log("Clicked ok button");
      let id = this.addUserInfo.userId;
      let name = this.addUserInfo.userName;
      let password = this.addUserInfo.password;
      let email = this.addUserInfo.userEmail;
      let tel = this.addUserInfo.userTel;
      let state = Boolean(Number(this.addUserInfo.userState));

      let user = {
        userId: id,
        username: name,
        password: password,
        email: email,
        tel: tel,
        userState: state,
        userRole: true,
      };

      let that = this;
      axios.post(`${url}/user/add`, user).then(
        function (res) {
          // console.log(res);
          if (res.data === 1) {
            that.$message.success("添加成功", 10);
          } else {
            that.$message.success("添加失败", 10);
          }
        },
        function (err) {
          console.log(err);
        }
      );
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
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.userId)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      // console.log(newData);
      const target = newData.filter((item) => key === item.userId)[0];
      // console.log(target);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    deleteItem(key) {
      // console.log(key);
      let that = this;
      axios.delete(`${url}/user/delete/${key}`).then(
        function (res) {
          // console.log(res.data);
          if (res.data === 1) {
            that.$message.success("删除成功", 10);
          } else {
            that.$message.error("删除失败", 10);
          }
        },
        function (err) {}
      );
    },
    changestate(key) {
      // console.log(key);
      let that = this;
      let id = key.userId;
      let name = key.username;
      let password = key.password;
      let email = key.email;
      let tel = key.tel;
      let state = !key.userState;
      let role = key.userRole;

      let user = {
        userId: id,
        username: name,
        password: password,
        email: email,
        tel: tel,
        userState: state,
        userRole: role,
      };

      // console.log(user);

      axios.put(`${url}/user/update`, user).then(
        function (res) {
          console.log(res.data);
          if (res.data === 1) {
            that.$message.success("用户状态已更改", 10);
          } else {
            that.$message.error("用户状态更改失败", 10);
          }
        },
        function (ree) {}
      );
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.userId)[0];
      // console.log(target);
      let that = this;
      axios.put(`${url}/user/update`, target).then(
        function (res) {
          // console.log(res.data);
          if (res.data === 1) {
            that.editingKey = "";
            that.$message.success("修改成功", 10);
          } else {
            that.$message.error("修改失败", 10);
          }
        },
        function (err) {
          console.log(err);
        }
      );
      delete target.editable;
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.userId)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.userId)[0]
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