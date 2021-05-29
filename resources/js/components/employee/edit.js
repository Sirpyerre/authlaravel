import React from 'react';
import FormEmployee from "./form";
const EditEmployee = ({match}) => {
    console.log('id', match);
    const {id} = match.params
    console.log('id', id);
    return (
        <>
            <h3>Edit employee {id}</h3>
            <FormEmployee name="editEmployee"/>
        </>
    )
}

export default EditEmployee;
