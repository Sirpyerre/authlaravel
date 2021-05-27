import React from 'react';

const List = () => {
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
            </tbody>
        </table>
    )
};

export default List;
