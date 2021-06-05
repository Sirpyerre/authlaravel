import React, {useEffect, useState} from 'react';
import FormEmployee from "./form";
import {Form, notification} from 'antd';
import connection from "../../services/connection";
import {useHistory} from "react-router-dom";
import moment from "moment";

const EditEmployee = ({match}) => {
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [form] = Form.useForm();
    const [positions, setPositions] = useState([]);
    const [findEmployee, setFindEmployee] = useState(false);
    const [data, setData] = useState({});

    let history = useHistory();

    useEffect(() => {
        connection.get('/positions')
            .then(response => {
                if (response.status === 200) {
                    setPositions(response.data)
                }
            });

        connection.get(`/employee/editEmployee/${id}`)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data.data;

                    if (data.email !== undefined) {
                        const birthday = moment(data.birthday);
                        form.setFieldsValue({
                            'name': data.name,
                            'first_name': data.firstName,
                            'second_name': data.secondName,
                            'email': data.email,
                            'birthday': birthday,
                            'phone': data.phone,
                            'picture': data.picture,
                            'position_id': data.position_id,
                            'salary': parseInt(data.salary),
                        });

                        setFindEmployee(true);
                        setData({id: data.id})

                        let fileList = [];

                        if (data.picture !== '') {
                            fileList.push({uid: data.id, url: data.picture, name: data.name});
                            setDefaultFileList(fileList);
                        }
                    }
                }
            }).catch(error => {
            console.log("error geting employee:", error);
        })
    }, []);

    const removeFile = data => {
        connection.post('employee/removeFile', data).then(response => {
            if (response.status === 200) {
                setDefaultFileList([]);
            }
        }).catch(error => {
            console.log('removing', error);
        })
    }
    const {id} = match.params;

    const uploadFiled = ({
                             action,
                             data,
                             file,
                             filename,
                             headers,
                             onError,
                             onProgress,
                             onSuccess,
                             withCredentials,
                         }) => {
        const formData = new FormData();
        formData.append(filename, file);
        connection.post(`/employee/upload/${data.id}`, formData).then(response => {
            if (response.status === 200) {
                setDefaultFileList([response.data]);
            }
        }).catch(error => {
            console.log('error uploadinf', error);
        });
    }

    const editEmployee = () => {
        form.validateFields()
            .then(values => {
                try {
                    connection
                        .post(`/employee/update/${id}`, values)
                        .then((response) => {
                            if (response.status === 200) {
                                notification.success({
                                    message: "Saved",
                                    description: response.data.message,
                                });
                                setTimeout(() => {
                                    history.push("/employee/index");
                                }, 300);
                            }
                        })
                        .catch((error) => {
                            console.log("error:", error);
                        });
                } catch (e) {
                    console.log("dont save:", e);
                    notification.error({
                        message: "Warning",
                        description: "Validation error",
                    });
                }
            })
            .catch(errorInfo => {
                console.log("errorInfo:", errorInfo);
                notification.error({
                    message: "Warning",
                    description: "Validation error",
                });
            })
    };

    const messageNotFount = (
        <p className="alert alert-danger">Employee not fount!</p>
    );

    return (
        <>
            <h3>Edit employee {id}</h3>
            {
                findEmployee ? <FormEmployee
                    form={form}
                    name="editEmployee"
                    positions={positions}
                    saveHandler={editEmployee}
                    customUpload={uploadFiled}
                    data={data}
                    fileList={defaultFileList}
                    removeHandler={removeFile}
                /> : messageNotFount
            }

        </>
    )
};

export default EditEmployee;
