import React from "react";
import Iframe from 'react-iframe';

const ManagePage: React.FC = (): JSX.Element => {
    return (
        <Iframe url={process.env.REACT_APP_MANAGE_URL || ""}
            width="100%"
            height="100%"
            id="myId"
            position="relative"
        />
    )
}

export default ManagePage;


