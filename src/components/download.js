import React from "react";
import {
    Form,
    TextField,
    Button,
    Divider,
    Provider,
    lightTheme
} from '@adobe/react-spectrum';

const DownloadUtil = ({}) => {
    const isBrowser = typeof window !== "undefined"
    let [text, setText] = React.useState();
    if(isBrowser) {
        return (
            <>
                <Provider theme={lightTheme} colorScheme="light">
                    <h1>View Your File Here</h1>
                    <Divider/>
                    <Form maxWidth="size-3600">
                        <TextField onChange={setText} maxWidth="100%" label="Download URI" id="uri"/>
                        <br/>
                    </Form>
                    <a href={text}>
                        <Button variant="accent">View</Button>
                    </a>
                    <br/><br/>
                </Provider>
            </>
        );
    }
};



export { DownloadUtil };