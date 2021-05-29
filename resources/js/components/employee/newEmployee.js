import React, {useState, useEffect} from 'react';
import FormEmployee from './form';
import {Form} from 'antd';
import connection from "../../services/connection";



const NewEmployee = () => {
    const [form] = Form.useForm();
    const [positions, setPositions] = useState([]);

    useEffect(()=> {
        connection.get('/positions')
            .then(response => {
                if (response.status === 200) {
                    setPositions(response.data)
                }
            })
    }, []);

    return (
        <>
            <h3>Add new employee</h3>
            <FormEmployee name="newEmployee" positions={positions}/>
        </>
    )
}

export default NewEmployee;
