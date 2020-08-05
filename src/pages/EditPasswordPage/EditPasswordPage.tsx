import React from 'react';
import EditPasswordForm from '../../components/EditPasswordForm/EditPasswordForm';

type IProps = {
    user: object,
}

function EditPasswordPage(props: IProps) {
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