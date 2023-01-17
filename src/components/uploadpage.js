import React, { useState } from "react";
// import {CopyToClipboard} from 'react-copy-to-clipboard';
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
    Radio, lightTheme, ProgressCircle
} from '@adobe/react-spectrum';
import {defaultTheme} from '@adobe/react-spectrum';
import {Code} from "@adobe/gatsby-theme-aio/src/components/Code";

let AID = 'default asset id';

function doSomething(setShowResponse, format) {
    const isBrowser = typeof window !== "undefined"
    if(isBrowser) {
        let apiKey = document.querySelector("#clientID").value.toString();
        let accessToken = "Bearer " + document.querySelector("#accessToken").value.toString();
        let input = document.querySelector("#file").files[0];
        let axios = require("axios").default;

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
            data: data1
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log("Success1!!");
                let presignedURI = response.data['uploadUri'].toString();
                let assetID = response.data['assetID'].toString();
                AID = assetID;

                let options = {
                    method: 'PUT',
                    url: presignedURI,
                    headers: {'Content-Type': format},
                    data: input
                };

                axios.request(options).then(function (response1) {
                    console.log(response1.status);
                    console.log(response1.data);
                    setShowResponse(true);
                }).catch(function (error) {
                    alert("Failure (unable to upload)");
                    console.error(error);
                });
            })
            .catch(function (error) {
                console.log(error);
                alert("Failure (unable to fetch pre-signed URI)");
            });
    }
}

const UploadUtil = ({}) => {
    const isBrowser = typeof window !== "undefined"
    let [selected, setSelected] = useState('pdf');
    const [showResponse, setShowResponse] = useState(false);
    if(isBrowser) {
        const handleClick = () => {
            let mime = '';
            if (selected === "pdf") {
                mime = 'application/pdf';
            } else if (selected === "docx") {
                mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            }
            doSomething(setShowResponse, mime);
        };

        return (
            <>
                <Provider theme={defaultTheme} colorScheme="light">
                    <h1>Upload Your File</h1>
                    <Divider/>
                    {/*<Form maxWidth="size-1800" aria-labelledby="label-3">*/}
                    <Form maxWidth="size-3600">
                        <TextField maxWidth="100%" label="Client ID" id="clientID"/>
                        <TextField width="size-3600" maxWidth="100%" label="Access Token" id="accessToken"/>
                        <RadioGroup
                            label="File Format"
                            value={selected}
                            onChange={setSelected}
                        >
                            <Radio value="pdf">PDF</Radio>
                            <Radio value="docx">DOCX</Radio>
                        </RadioGroup>
                        <br/>
                        <input type="file" id="file"/> <br/>
                        {/*<button type="button" id="btn">Submit</button>*/}
                    </Form>

                    <DialogTrigger>
                        <Button variant="accent" onPress={() => {
                            handleClick()
                            setShowResponse(false)
                        }}>Upload</Button>
                        {(close) => (
                            <Dialog>
                                {showResponse === false && <Heading>Uploading...</Heading>}
                                {showResponse === true && <Heading>File Uploaded Successfully!</Heading>}
                                <Divider/>
                                <Content>
                                    {showResponse === false && <ProgressCircle aria-label="Loading…" isIndeterminate/>}
                                    {showResponse === true && <p>Asset ID : {AID}</p>}
                                </Content>
                                <ButtonGroup>
                                    {showResponse === true &&
                                        <Button variant="accent" onPress={() => navigator.clipboard.writeText(AID)}>Copy</Button>}
                                    <Button variant="secondary" onPress={close}>Close</Button>
                                </ButtonGroup>
                            </Dialog>
                        )}
                    </DialogTrigger>

                    {/*{showResponse === true && <ResponseDialogue/>}*/}


                    {/*<ButtonGroup>*/}
                    {/*    <Button variant="accent" id = "btn" onPress={() => { handleClick()*/}
                    {/*        setShowResponse(false)}}>Upload</Button>*/}

                    {/*{showResponse === true &&*/}
                    {/*    <CopyToClipboard text={AID}>*/}
                    {/*        <Button variant="secondary">Copy Asset ID</Button>*/}
                    {/*    </CopyToClipboard>*/}
                    {/*}*/}

                    {/*{showResponse === true &&*/}
                    {/*<Button variant="secondary" onPress={"window.location.href='https://clever-catfish-93.redoc.ly/';"}>*/}
                    {/*    Continue Tryout*/}
                    {/*</Button>*/}
                    {/*}*/}
                    {/*<Button variant="secondary" onPress={close}>Close</Button>*/}
                    {/*</ButtonGroup>*/}
                    <br/><br/>
                    {showResponse === true && <a href="https://adobedocs.github.io/pdfservices-api-documentation/apis/" target="_blank">
                        Continue Your Journey!
                    </a>}
                </Provider>
            </>
        );
    }
};



export { UploadUtil };
