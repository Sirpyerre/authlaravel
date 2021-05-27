import React, {useState} from "react";
import {Menu} from 'antd';
import {Link} from "react-router-dom";
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';

const Nav = () => {
    const [current, setCurrent] = useState('listing');

    const handleClick = e => {
        console.log('click ', e.key);
        setCurrent(e.key);
    };

    return (
        <>
            <Menu onClick={handleClick} mode="horizontal" style={{marginBottom: '1rem'}} selectedKeys={current}>
                <Menu.Item key="listing" icon={<MailOutlined/>}>
                    <Link to="/employee/index">List</Link>
                </Menu.Item>
                <Menu.Item key="create" icon={<AppstoreOutlined/>}>
                    <Link to="/employee/form">Create</Link>
                </Menu.Item>
            </Menu>
        </>
    )
};

export default Nav;
