import React, {useState, useEffect} from 'react';
import FormEmployee from './form';
import {Form, notification} from 'antd';
import connection from "../../services/connection";
import {useHistory} from "react-router-dom";

const NewEmployee = () => {
    const [form] = Form.useForm();
    const [positions, setPositions] = useState([]);
    let history = useHistory();

    useEffect(()=> {
        connection.get('/positions')
            .then(response => {
                if (response.status === 200) {
                    setPositions(response.data)
                }
            })
    }, []);

    const createEmployee = () => {
        form.validateFields()
            .then(values=>{
                console.log("values:", values);
                try{
                    connection.post("/employee/save",values).then(response => {
                        if (response.status === 200) {
                            notification.success({
                                message: 'Saved',
                                description: response.data.message
                            });
                            setTimeout(()=> {
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
            />
        </>
    )
}

export default NewEmployee;
