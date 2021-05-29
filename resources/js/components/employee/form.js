import React from 'react';
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
/* eslint-enable no-template-curly-in-string */

const FormEmployee = ({name}) => {
    const onFinish = (values) => {
        console.log(values);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    return (
        <Form
            {...layout} name={name}
            onFinish={onFinish}
            validateMessages={validateMessages}>
            <Form.Item
                name='name'
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='first_name'
                label="First Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='second_name' label="Second Name">
                <Input/>
            </Form.Item>
            <Form.Item
                name={'email'}
                label="Email"
                rules={[
                    {
                        type: 'email',
                    },
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='birthday'
                label="Birth day"
            >
                <DatePicker/>
            </Form.Item>
            <Form.Item name='phone' label="Phone">
                <Input/>
            </Form.Item>
            {/*<Form.Item name='picture' label="Photo">*/}
            {/*    <Input.TextArea/>*/}
            {/*</Form.Item>*/}
            <Form.Item
                name="picture"
                label="Photo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined/>}>Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item name='position_id' label="Position">
                <Select allowClear={true}>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name='salary' label="Salary">
                <InputNumber/>
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
