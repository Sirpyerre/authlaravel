import React, {useState, useEffect} from 'react';
import FormEmployee from './form';
import {Form, notification} from 'antd';
import connection from "../../services/connection";
import {useHistory} from "react-router-dom";

const NewEmployee = () => {
    const [form] = Form.useForm();
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [positions, setPositions] = useState([]);
    let history = useHistory();

    useEffect(() => {
        connection.get('/positions')
            .then(response => {
                if (response.status === 200) {
                    setPositions(response.data)
                }
            })
    }, []);

    const uploadFiled = ({file, filename,}) => {
        const formData = new FormData();
        formData.append(filename, file);
        connection.post(`/employee/upload/`, formData).then(response => {
            if (response.status === 200) {
                setDefaultFileList([response.data]);

                form.setFieldsValue({
                    'picture': response.data.path,
                });
            }
        }).catch(error => {
            console.log('error uploadinG', error);
        });
    }

    const createEmployee = () => {
        form.validateFields()
            .then(values => {
                console.log("values nre Form:", values);
                try {
                    connection.post("/employee/save", values).then(response => {
                        if (response.status === 200) {
                            notification.success({
                                message: 'Saved',
                                description: response.data.message
                            });
                            setTimeout(() => {
                                history.push("/employee/index");
                            }, 300);

                        } else {
                            console.log("dont save");
                        }
                    })
                        .catch(error => {
                            console.log("error:", error)
                        })
                } catch (e) {
                    console.log("dont save:", e);
                }
            })
            .catch(errorInfo => {
                console.log('Validate Failed:', errorInfo);
            })
    };

    return (
        <>
            <h3>Add new employee</h3>
            <FormEmployee
                form={form}
                name="newEmployee"
                positions={positions}
                saveHandler={createEmployee}
                fileList={defaultFileList}
                customUpload={uploadFiled}
            />
        </>
    )
}

export default NewEmployee;
