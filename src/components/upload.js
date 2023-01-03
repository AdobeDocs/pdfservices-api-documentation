import React, { useState } from "react";
//import {AssetID} from "./assetID";
import axios from 'axios';
import PropTypes from "prop-types";
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
    Radio
} from '@adobe/react-spectrum';
import {defaultTheme} from '@adobe/react-spectrum';

let AID = 'default asset id';

function doSomething(setShowResponse, format) {
    let apiKey = document.querySelector("#clientID").value.toString();
    let accessToken = "Bearer " + document.querySelector("#accessToken").value.toString();
    let input = document.querySelector("#file").files[0];
    // let apiKey = data.clientID.toString();
    // let accessToken = data.accessToken.toString();
    // let input = data.file;
    // let content_type = "application/" + selected;
    // let content_type = "application/" + document.querySelector("#extn").value.toString();
    // alert(content_type);
    let axios = require("axios").default;
    //console.log(selected," ",i);
    // console.log(apiKey," ",accessToken);
    ////////////////

    let data1 = JSON.stringify({
        "mediaType": format
    });

    let config = {
        method: 'POST',
        url: 'https://pdf-services.adobe.io/assets',
        headers: {
            'X-API-Key': apiKey,
            'Authorization': accessToken,
            'Content-Type': 'application/json'
        },
        data : data1
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log("Success1!!");
            let presignedURI = response.data['uploadUri'].toString();
            let assetID = response.data['assetID'].toString();
            AID = ("AssetID : " + assetID);

            let options = {
                method: 'PUT',
                url: presignedURI,
                headers: {'Content-Type': format},
                data: input
            };

            axios.request(options).then(function (response1) {
                console.log(response1.status);
                console.log(response1.data);
            }).catch(function (error) {
                alert("Failure");
                console.error(error);
            });
            setShowResponse(true);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const UploadUtil = ({}) => {

    let [selected, setSelected] = useState('pdf');
    const [showResponse, setShowResponse] = useState(false);
    const [data, setData] = useState({
        clientID : '',
        accessToken : '',
        file : ''
    });

    // const handleChange = (e) => {
    //     const newData = { ...data };
    //     newData[e.target.id] = e.target.value;
    //     setData(newData);
    // };
    //
    const handleClick = () => {
        let mime = '';
        if(selected === "pdf"){
            mime = 'application/pdf';
        }
        else if(selected === "docx"){
            mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        }
        doSomething(setShowResponse, mime);
    };



    return(
        <>
            <Provider theme={defaultTheme}>
                <DialogTrigger>
                    <ActionButton onPress={() => setShowResponse(false)}>Try it out!</ActionButton>
                    {(close) => (
                        <Dialog>
                            <Heading>Upload Your File</Heading>
                            <Divider />
                            <Content>
                                <Form maxWidth="size-1800" aria-labelledby="label-3">
                                    <TextField label="Client ID" id = "clientID" />
                                    <TextField label="Access Token" id = "accessToken" />
                                    <RadioGroup
                                        label="File Format"
                                        value={selected}
                                        onChange={setSelected}
                                    >
                                        <Radio value="pdf">PDF</Radio>
                                        <Radio value="docx">DOCX</Radio>
                                    </RadioGroup>
                                    <br/>
                                    <input type="file" id = "file" /> <br/>
                                    {/*<button type="button" id="btn">Submit</button>*/}
                                </Form>

                                {showResponse === true && <ResponseDialogue/>}

                                <ButtonGroup>
                                    <Button variant="accent" id = "btn" onPress={() => { handleClick()
                                        setShowResponse(false)}}>Upload</Button>
                                    {showResponse === true && <a href="https://cowardly-insect-15.redoc.ly/" target="_blank">
                                        <Button variant="secondary">Continue Your Journey!</Button>
                                    </a>}
                                    <Button variant="secondary" onPress={close}>Close</Button>
                                </ButtonGroup>
                                <br/><br/>

                            </Content>
                        </Dialog>
                    )}
                </DialogTrigger>
            </Provider>
        </>
    );
};



const ResponseDialogue = ({}) => {
    return(
        <>
            <Content>
                <h3>File Uploaded Successfully!</h3>
                <h4>{AID}</h4>
                <br/>
            </Content>
        </>
    );
};

export { UploadUtil };
