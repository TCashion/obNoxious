import React, { Component } from 'react';
import EditPasswordForm from '../../components/EditPasswordForm/EditPasswordForm';

function EditPasswordPage(props) {
    return (
        <>
            <EditPasswordForm
                {...props}
                user={props.user}
            />
        </>
    )
}

export default EditPasswordPage;