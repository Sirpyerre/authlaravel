import React, {useState, useEffect} from 'react';
import connection from "../../services/connection";

const List = () => {
        const [employees, setEmployees] = useState({});

        useEffect(() => {
            const employeeList = connection.get('/employee/get')
                .then(response => {
                    console.log('response:', response);
                    setEmployees(response.data)
                });
        }, []);

        console.log("emplo:", employees.data);

        if (employees.data === undefined) {
            return (
                <>No hay datos</>
            )
        }

        return (
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
                <tr>
                    <td>100</td>
                    <td>Pedro Rojas Reyes</td>
                    <td>peter@monoforms.com</td>
                    <td>30-06-1981</td>
                    <td>22222222222</td>
                    <td>Web developer</td>
                    <td>1234.23</td>
                    <td>
                        Edit <br/>
                        Delete
                    </td>
                </tr>
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
                                    buttons {item.id}
                                </td>
                            </tr>
                        )
                    }) : null

                }
                </tbody>
            </table>
        )
    }
;

export default List;
