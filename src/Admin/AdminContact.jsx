import React, { useState } from "react";
import Admin from "./Admin";
import MaterialTable from "material-table";
import {
  Tabs,
  Button,
  Divider,
  Checkbox,
  Input,
  Space,
  Tag,
  Table,
  Image,
  Menu,
  Dropdown,
  Drawer,
  Card,
  Descriptions,
  Col,
  Row,
  Select,
  DatePicker,
  Form,
  Avatar,
  Typography,
  List,
} from "antd";
// import { ListGroup } from "react-bootstrap";
import { AudioOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SweetAlert from "react-bootstrap-sweetalert";
import AvatarImg from "./../Images/avatar.png";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

function RemoteData() {
  return (
    <MaterialTable
      title="Remote Data Preview"
      columns={[
        {
          title: "Avatar",
          field: "avatar",
          render: (rowData) => (
            <img
              style={{ height: 36, borderRadius: "50%" }}
              src={rowData.avatar}
            />
          ),
        },
        { title: "Id", field: "id" },
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
      ]}
      data={(query) =>
        new Promise((resolve, reject) => {
          let url = "https://reqres.in/api/users?";
          url += "per_page=" + query.pageSize;
          url += "&page=" + (query.page + 1);
          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              });
            });
        })
      }
    />
  );
}

const { Option } = Select;

class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> New account
        </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter user name" },
                  ]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[{ required: true, message: "Please enter url" }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[
                    { required: true, message: "Please select an owner" },
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    { required: true, message: "Please choose the type" },
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[
                    { required: true, message: "Please choose the approver" },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[
                    { required: true, message: "Please choose the dateTime" },
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter url description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter url description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function FullWidthGrid() {
  const classes = useStylesGrid();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const useStylesGridTwo = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function FullWidthGridTwo() {
  const classes = useStylesGridTwo();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const { Title } = Typography;

const Profile = ({ text }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function log(e) {
    console.log(e);
  }

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <>
      <Button type="text" onClick={showDrawer}>
        {text}
      </Button>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={350}
        bodyStyle={{
          paddingBottom: 80,
          backgroundColor: "#020C24",
          color: "#ccc",
        }}
      >
        <Card
          style={{
            width: 300,
            backgroundColor: "#020C24",
            color: "#ccc",
            border: "none",
          }}
        >
          <Meta
            avatar={
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={AvatarImg}
              />
            }
            title={
              <Title level={2} style={{ color: "#ccc" }}>
                Jhon Tacchi
              </Title>
            }
          />

          <Divider style={{ border: "1px solid #ccc" }} />

          <List size="small" style={{ border: "none", outline: "none" }}>
            <List.Item style={{ color: "#ccc" }}>Name : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Surname : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Email : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Phone : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Address : </List.Item>
            <List.Item style={{ color: "#ccc" }}>City : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Nation : </List.Item>
          </List>

          <Divider style={{ border: "1px solid #ccc" }} />

          <Title level={2} style={{ textAlign: "center", color: "#ccc" }}>
            {" "}
            Teachers
          </Title>
          <FullWidthGrid />
          <Divider style={{ border: "1px solid #ccc" }} />

          <Title level={2} style={{ textAlign: "center", color: "#ccc" }}>
            Tags{" "}
          </Title>
          <FullWidthGridTwo />
        </Card>
      </Drawer>
    </>
  );
};

const ProfileTwo = ({ text }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function log(e) {
    console.log(e);
  }

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <>
      <Button type="text" onClick={showDrawer}>
        {text}
      </Button>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={350}
        bodyStyle={{
          paddingBottom: 80,
          backgroundColor: "#020C24",
          color: "#ccc",
        }}
      >
        <Card
          style={{
            width: 300,
            backgroundColor: "#020C24",
            color: "#ccc",
            border: "none",
          }}
        >
          <Meta
            avatar={
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4g8xUnnDU4kVOp8_-3f3aPDusw_D2AlyXw&usqp=CAU"}
              />
            }
            title={
              <Title level={2} style={{ color: "#ccc" }}>
               Jim Grean
              </Title>
            }
          />

          <Divider style={{ border: "1px solid #ccc" }} />

          <List size="small" style={{ border: "none", outline: "none" }}>
            <List.Item style={{ color: "#ccc" }}>Name : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Surname : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Email : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Phone : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Address : </List.Item>
            <List.Item style={{ color: "#ccc" }}>City : </List.Item>
            <List.Item style={{ color: "#ccc" }}>Nation : </List.Item>
          </List>

          <Divider style={{ border: "1px solid #ccc" }} />

          <Title level={2} style={{ textAlign: "center", color: "#ccc" }}>
           Students
          </Title>
          <FullWidthGrid />
          <Divider style={{ border: "1px solid #ccc" }} />

          <Title level={2} style={{ textAlign: "center", color: "#ccc" }}>
            Tags
          </Title>
          <FullWidthGridTwo />
        </Card>
      </Drawer>
    </>
  );
};

const link = window.location.href;
const { Meta } = Card;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href={link}>
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href={link}>
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      3rd menu item（disabled）
    </Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Name e Surname",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Teacher",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Email",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Expiry",
    dataIndex: "new",
    key: "new",
  },
  {
    title: "Status",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />

        <Profile text="Jhon Doe" />
      </>
    ),
    tags: ["nice", "developer", "loser"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "2",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["loser"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="red">Expire</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "3",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "4",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "5",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "6",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "7",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "8",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "9",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <Profile text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
];

const columnsTwo = [
  {
    title: "Name e Surname",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Students",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Email",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Expiry",
    dataIndex: "new",
    key: "new",
  },
  {
    title: "Status",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

const dataTwo = [
  {
    key: "1",
    name: (
      <>
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["nice", "developer", "loser"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "2",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["loser"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="red">Expire</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "3",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "4",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "5",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "6",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "7",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "8",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
  {
    key: "9",
    name: (
      <>
        {" "}
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />{" "}
        <ProfileTwo text="Jim Green" />
      </>
    ),
    tags: ["cool", "teacher"],
    age: "ino@username.com",
    new: "17/August/2021",
    address: (
      <>
        <Tag color="green">OK</Tag>
      </>
    ),
    action: (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ... <DownOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
];

const { TabPane } = Tabs;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const onSearch = (value) => console.log(`Search Values${value}`);

const operations = (
  <Search
    placeholder="Search"
    allowClear
    onSearch={onSearch}
    style={{ width: 200 }}
  />
);

const OperationsSlot = {
  left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

export default function AdminContact() {
  const [position, setPosition] = React.useState(["left", "right"]);
  const slot = React.useMemo(() => {
    if (position.length === 0) return null;

    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);

  return (
    <div>
      <Admin />

      <Tabs
        tabBarExtraContent={operations}
        size="large"
        animated
        tabBarStyle={{ fontSize: "12pt" }}
      >
        <TabPane tab="Teachers" key="1">
          <Table columns={columns} dataSource={data} />
        </TabPane>
        <TabPane tab="Students" key="2">
          <Table columns={columnsTwo} dataSource={dataTwo} />
        </TabPane>
      </Tabs>
    </div>
  );
}
