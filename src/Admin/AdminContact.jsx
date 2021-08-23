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
  Avatar,
  Image,
  Menu,
  Dropdown,
  Drawer,
  Card,
  Descriptions,
} from "antd";
import { ListGroup } from "react-bootstrap";
import { AudioOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SweetAlert from "react-bootstrap-sweetalert";

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
  return (
    <>
      <Button type="text" onClick={showDrawer}>
        {text}
      </Button>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
        <Card
          style={{ width: 300 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Jhon Doe"
            description="Teacher"
          />
          <hr />
          <ListGroup>
            <ListGroup.Item disabled>Name</ListGroup.Item>
            <ListGroup.Item>Surname</ListGroup.Item>
            <ListGroup.Item>Email</ListGroup.Item>
            <ListGroup.Item>Phone</ListGroup.Item>
            <ListGroup.Item>Address</ListGroup.Item>
            <ListGroup.Item>City</ListGroup.Item>
            <ListGroup.Item>Nation</ListGroup.Item>
          </ListGroup>
          <hr />
         
          <h5 style={{textAlign:"center"}}>  Teachers</h5>
          <Tag closable onClose={log} color="green"> 
            Jhon Doe
          </Tag>
          <Tag closable onClose={log}  color="green">
            Jhon Doe 
          </Tag>
          <Tag closable onClose={log}  color="green">
            Jhon Doe
          </Tag>
       <hr/>
          <h5 style={{textAlign:"center"}}>  Tags</h5>
          <Tag closable onClose={log} color="green"> 
          Tag
          </Tag>
          <Tag closable onClose={log}  color="green">
          Tag
          </Tag>
          <Tag closable onClose={log}  color="green">
          Tag
          </Tag>
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
  return (
    <>
      <Button type="text" onClick={showDrawer}>
        {text}
      </Button>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
        <Card
          style={{ width: 300 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Mike Brown"
            description="Student"
          />
          <hr />
          <ListGroup>
            <ListGroup.Item disabled>Name</ListGroup.Item>
            <ListGroup.Item>Surname</ListGroup.Item>
            <ListGroup.Item>Email</ListGroup.Item>
            <ListGroup.Item>Phone</ListGroup.Item>
            <ListGroup.Item>Address</ListGroup.Item>
            <ListGroup.Item>City</ListGroup.Item>
            <ListGroup.Item>Nation</ListGroup.Item>
          </ListGroup>
          <hr />
         
          <h5 style={{textAlign:"center"}}>  Teachers</h5>
          <Tag closable onClose={log} color="green"> 
            Jhon Doe
          </Tag>
          <Tag closable onClose={log}  color="green">
            Jhon Doe 
          </Tag>
          <Tag closable onClose={log}  color="green">
            Jhon Doe
          </Tag>
       <hr/>
          <h5 style={{textAlign:"center"}}>  Tags</h5>
          <Tag closable onClose={log} color="green"> 
          Tag
          </Tag>
          <Tag closable onClose={log}  color="green">
          Tag
          </Tag>
          <Tag closable onClose={log}  color="green">
          Tag
          </Tag>
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
