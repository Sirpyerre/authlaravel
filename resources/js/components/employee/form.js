import React, {useState} from 'react';
import {Form, Input, InputNumber, Button, DatePicker, Select, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const FormEmployee = ({
                          form,
                          name,
                          positions,
                          saveHandler,
                          customUpload,
                          data,
                          fileList,
                          removeHandler
                      }) => {
    const options = positions.map(d => <Select.Option key={d.id}>{d.title}</Select.Option>);
    console.log("defaultFile-List", fileList);

    return (
        <Form
            form={form}
            {...layout} name={name}
            onFinish={saveHandler}
            validateMessages={validateMessages}>
            <Form.Item name='name' label="Name" rules={[{required: true,},]}>
                <Input/>
            </Form.Item>
            <Form.Item name='first_name' label="First Name" rules={[{required: true,},]}>
                <Input/>
            </Form.Item>
            <Form.Item name='second_name' label="Second Name">
                <Input/>
            </Form.Item>
            <Form.Item name={'email'} label="Email" rules={[{type: 'email',}, {required: true,},]}>
                <Input/>
            </Form.Item>
            <Form.Item name='birthday' label="Birth day">
                <DatePicker format="YYYY/MM/DD"/>
            </Form.Item>
            <Form.Item name='phone' label="Phone">
                <Input/>
            </Form.Item>
            <Form.Item name='picture' label="Photo">
                <Upload
                    name="fileEmployee"
                    accept="image/*"
                    maxCount={1}
                    onRemove={removeHandler}
                    fileList={fileList}
                    customRequest={customUpload} data={data} listType="picture-card">
                    {fileList.length >= 1 ? null : <div>Upload Button</div>}
                </Upload>
            </Form.Item>
            <Form.Item name='position_id' label="Position" rules={[{required: true}]}>
                <Select allowClear={true} placeholder="Please select a position">
                    {options}
                </Select>
            </Form.Item>
            <Form.Item name='salary' label="Salary" rules={[{
                required: true,
                type: 'number'
            },]}>
                <InputNumber min={1000} max={100000}/>
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormEmployee;
