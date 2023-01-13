import React, { useState } from "react";
import {
    Form,
    TextField,
    TextArea,
    ActionButton,
    Button,
    RadioGroup,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Header,
    Heading,
    Text,
    Provider,
    Link,
    Radio, lightTheme, ProgressCircle
} from '@adobe/react-spectrum';

// function downloadAsset() {
//     const isBrowser = typeof window !== "undefined"
//     if(isBrowser) {
//         let uri = document.getElementById("uri").value.toString();
//         let axios = require("axios").default;
//
//         let config = {
//             method: 'GET',
//             url: uri
//         };
//
//         axios(config)
//             .then(function (response) {
//                 console.log(JSON.stringify(response.data));
//                 console.log("Success!!");
//             })
//             .catch(function (error) {
//                 console.log(error);
//                 alert("Failed to download");
//             });
//     }
// }

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
                    {/*<Button variant="accent" onPress={downloadAsset}>Download</Button>*/}
                    <br/><br/>
                </Provider>
            </>
        );
    }
};



export { DownloadUtil };
