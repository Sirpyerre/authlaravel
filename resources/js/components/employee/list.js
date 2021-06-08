import React, {useState, useEffect} from 'react';
import connection from "../../services/connection";
import {Pagination, Spin, Popconfirm} from 'antd';
import {Link} from "react-router-dom";

const List = () => {
        const [employees, setEmployees] = useState({});
        const [statusSpin, setStatusSpin] = useState(false);
        const [confirmLoading, setConfirmLoading] = useState({});
        const [visibleConfirmDelete, setVisibleConfirmDelete] = useState({});

        useEffect(() => {
            connection.get('/employee/get')
                .then(response => {
                    setEmployees(response.data)
                    setStatusSpin(false);
                });
        }, []);


        if (employees.data === undefined) {
            return (
                <>
                    <Spin spinning={statusSpin} tip="Loading...">
                        No hay datos
                    </Spin>
                </>
            )
        }

        const onChange = page => {
            console.log(page);
            connection.get(`/employee/get?page=${page}`)
                .then(response => {
                    console.log('response.data:', response.data);
                    setEmployees(response.data)
                }).catch(error => {
                console.log('error retrieving list:', error);
            });
        };

        const showDeleteEmployee = id => {
            setVisibleConfirmDelete({...visibleConfirmDelete, [id]: true});
        }

        const cancelDeleteEmployee = id => {
            setVisibleConfirmDelete({...visibleConfirmDelete, [id]: false});
        }

        const okDeleteEmployee = async id => {
            setConfirmLoading({...confirmLoading, [id]:true});

            try {
                const response = await connection.delete(`/employee/${id}`);
                console.log('response.data:', response.data);
                if (response.status === 202) {

                    connection.get('/employee/get')
                        .then(response => {
                            setEmployees(response.data)
                            setStatusSpin(false);
                        });

                    cancelDeleteEmployee(id);
                    setConfirmLoading({...confirmLoading, [id]: false});
                }

            } catch (e) {
                console.log("error deleting:", e);
            }
        }

        return (
            <>
                <div className="table-responsive ">

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>E-mail</th>
                            <th>Full Name</th>
                            <th>Birthday</th>
                            <th>Phone</th>
                            <th>Position</th>
                            <th>Salary</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            employees ? employees.data.map(item => {
                                return (
                                    <tr key={item.email}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{`${item.name} ${item.firstName} ${item.secondName}`}</td>
                                        <td>{item.birthday}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.position}</td>
                                        <td>$ {item.salary}</td>
                                        <td>
                                            <a className="btn btn-warning btn-sm mr-2"
                                               href={`/employee/edit/${item.id}`}>Edit</a>
                                            <Popconfirm
                                                title="Please confirm this action?"
                                                visible={visibleConfirmDelete[item.id]}
                                                onConfirm={() => okDeleteEmployee(item.id)}
                                                okButtonProps={{loading: confirmLoading[item.id]}}
                                                onCancel={() => cancelDeleteEmployee(item.id)}
                                            >
                                                <a className="btn btn-danger btn-sm"
                                                   onClick={() => showDeleteEmployee(item.id)}
                                                   href="#">Trash</a>
                                            </Popconfirm>
                                            <a href={`/employee/details/${item.id}`}>
                                                Details
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }) : null
                        }
                        </tbody>
                    </table>
                    {
                        employees ? <Pagination
                            pageSize={employees.meta.per_page}
                            onChange={onChange}
                            total={employees.meta.total}
                        /> : null
                    }

                </div>
            </>
        )
    }
;

export default List;
