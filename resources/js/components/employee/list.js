import React, {useState, useEffect} from 'react';
import connection from "../../services/connection";
import {Pagination, Spin} from 'antd';

const List = () => {
        const [employees, setEmployees] = useState({});
        const [statusSpin, setStatusSpin] = useState(true);

        useEffect(() => {
            connection.get('/employee/get')
                .then(response => {
                    setEmployees(response.data)
                    setStatusSpin(false);
                });
        }, []);

        console.log("emplo:", employees.data);

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
                });
        };


        return (
            <>
                <div className="table-responsive ">

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Full Name</th>
                                <th>E-mail</th>
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
                                                <a className="btn btn-danger btn-sm"
                                                   href={`/employee/delete/${item.id}`}>Delete</a>
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
