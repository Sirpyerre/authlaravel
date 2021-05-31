import React, {useEffect, useState} from 'react';
import FormEmployee from "./form";
import {Form, notification} from 'antd';
import connection from "../../services/connection";
import {useHistory} from "react-router-dom";

const EditEmployee = ({match}) => {
    const [form] = Form.useForm();
    const [positions, setPositions] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState({});
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
                    const data = response.data;
                    form.setFieldsValue({
                        'name': data.name,
                        'first_name': data.first_name,
                        'second_name': data.first_name,
                        'email': data.email,
                        'birthday': data.birthday,
                        'phone': data.phone,
                        'picture': data.picture,
                        'position_id': data.position_id,
                        'salary': data.salary,
                    });
                }
            })


    }, []);

    const {id} = match.params;
    console.log('id', id);

    console.log('info', employeeInfo);

    const editEmployee = () => {
        form.validateFields()
            .then(values => {
                console.log("values:", values);
                try {
                    connection.post(`/employee/update/${id}`, values).then(response => {
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
            <h3>Edit employee {id}</h3>
            <FormEmployee
                form={form}
                name="editEmployee"
                positions={positions}
                saveHandler={editEmployee}
            />
        </>
    )
};

export default EditEmployee;
