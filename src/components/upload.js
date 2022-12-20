import React, { useState } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import {
    Form,
    TextField,
    ActionButton,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Header,
    Heading,
    Text,
    Provider,
    RadioGroup,
    Radio
} from '@adobe/react-spectrum';
import {defaultTheme} from '@adobe/react-spectrum';

function doSomething() {
    let apiKey = document.getElementById("clientID").value.toString();
    let accessToken = "Bearer " + document.getElementById("accessToken").value.toString();
    let input = document.getElementById("file").files[0];
    // let content_type = "application/" + selected;
    // let content_type = "application/" + document.getElementById("extn").value.toString();
    // alert(content_type);
    let axios = require("axios").default;
    //console.log(selected," ",i);
    // console.log(apiKey," ",accessToken);
    ////////////////

    let data1 = JSON.stringify({
        "mediaType": "application/pdf"
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
            alert("AssetID :" + assetID);

            let options = {
                method: 'PUT',
                url: presignedURI,
                headers: {'Content-Type': "application/pdf"},
                data: input
            };

            axios.request(options).then(function (response1) {
                //alert("Success");
                console.log(response1.status);
                console.log(response1.data);
            }).catch(function (error) {
                alert("Failure");
                console.error(error);
            });

        })
        .catch(function (error) {
            console.log(error);
        });
}

const UploadUtil = ({}) => {
    //let [selected, setSelected] = React.useState("pdf");
    let el = document.getElementById('btn');
    //let i=0;
    // let el2 = document.getElementById('clientID');
    // let el3 = document.getElementById('accessToken');
    // if(el2){console.log("CID exists!");}
    // if(el3){console.log("AT exists!");}


    if(el) {
        console.log("button exists");
        el.addEventListener("click", async (evt) => {
            //i++;
            //alert("click!!!");
            //console.log("click!!!");
            //let uri = document.getElementById("uri").value.toString();
            let apiKey = document.getElementById("clientID").value.toString();
            let accessToken = "Bearer " + document.getElementById("accessToken").value.toString();
            let input = document.getElementById("file").files[0];
            // let content_type = "application/" + selected;
            // let content_type = "application/" + document.getElementById("extn").value.toString();
            // alert(content_type);
            let axios = require("axios").default;
            //console.log(selected," ",i);
            // console.log(apiKey," ",accessToken);
    ////////////////

            let data1 = JSON.stringify({
                "mediaType": "application/pdf"
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
                    alert("AssetID :" + assetID);

                    let options = {
                        method: 'PUT',
                        url: presignedURI,
                        headers: {'Content-Type': "application/pdf"},
                        data: input
                    };

                    axios.request(options).then(function (response1) {
                        //alert("Success");
                        console.log(response1.status);
                        console.log(response1.data);
                    }).catch(function (error) {
                        alert("Failure");
                        console.error(error);
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });

    ////////////////


            // let options = {
            //     method: 'PUT',
            //     url: uri,
            //     headers: {'Content-Type': content_type},
            //     data: input
            // };

            //let [selected, setSelected] = React.useState('');



            // axios.request(options).then(function (response) {
            //     //alert("Success");
            //     console.log(response.status);
            //     console.log(response.data);
            // }).catch(function (error) {
            //     alert("Failure");
            //     console.error(error);
            // });

    })};

    return(
        <>
        <Provider theme={defaultTheme}>
        <DialogTrigger>
            <ActionButton>Try it out!</ActionButton>
            {(close) => (
                <Dialog>
                    <Heading>Upload Your File</Heading>
                    <Divider />
                    <Content>
                        <Form maxWidth="size-3600" aria-labelledby="label-3">
                            {/*<TextField label="URI" id = "uri"/>*/}
                            <TextField label="Client ID" id = "clientID"/>
                            <TextField label="Access Token" id = "accessToken"/>
                            {/*<TextField label="File Type" id = "extn"/>*/}
                            {/*<RadioGroup label="File Type" id = "extn"*/}
                            {/*            value={selected}*/}
                            {/*            onChange={setSelected}>*/}
                            {/*    <Radio value="pdf">PDF</Radio>*/}
                            {/*    <Radio value="docx">DOCX</Radio>*/}
                            {/*</RadioGroup>*/}
                            <input type="file" id = "file"/> <br/>
                            {/*<button type="button" id="btn">Submit</button>*/}
                            <Button variant="accent" id = "btn" onPress={() => doSomething()}>Upload</Button>
                        </Form>
                    </Content>
        {/*            <ButtonGroup>*/}
        {/*                <Button variant="secondary" onPress={close}>Close</Button>*/}
        {/*                /!*<button type="button" id="btn">Upload</button>*!/*/}
        {/*                <Button variant="accent" onPress={close}>Confirm</Button>*/}
        {/*            </ButtonGroup>*/}
                </Dialog>
            )}
        </DialogTrigger>
        </Provider>
        </>
        // <form>
        //     {/*URI :*/}
        //     {/*<input type="text" id="uri" /> <br/>*/}
        //     Client ID :
        //     <input type="text" id="clientID" /> <br/>
        //     Access Token:
        //     <input type="text" id="accessToken" /> <br/>
        //     File Format :
        //     <select name="extn" id="extn">
        //     <option value="pdf">PDF</option>
        //     <option value="docx">DOCX</option>
        //     </select><br/>
        //     Upload File:
        //     <input type="file" id="file" /> <br/>
        //     <button type="button" id="btn">Submit</button>
        // </form>
    );
};


export { UploadUtil };
