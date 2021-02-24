import React from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './child.css';
import axios from 'axios';
import Loader from "react-loader";

const ChildComponent = () =>{
    const [url,setUrl] = React.useState('');
    const [loaded, setLoaded] = React.useState(true);
    const [errorMsg,setErrorMsg] = React.useState('');
    const [disableSubmit,setDisableSubmit] = React.useState(false);
    const handleSubmit = () =>{
        setErrorMsg('');
        if(url && url != ''){
        setLoaded(!loaded);
        setDisableSubmit(true);
        axios.post('https://screenshotbackendapp.herokuapp.com/',{url:`${url}`}).then((data)=>{
           console.log(data.data);
           const b64 = new Buffer.from(data.data).toString('base64');
           //const url = URL.createObjectURL(new Blob([data.data],{type: 'image/jpg'}));
           console.log("data:image/png;base64," +b64);
          const link = document.createElement("a");
          link.href = "data:image/png;base64," +b64;
          link.setAttribute("download", "image1.jpg"); //or any other extension
          document.body.appendChild(link);
          link.click();
          setLoaded(loaded);
          setDisableSubmit(false);
        }).catch((e) => {
            console.log(e);
            setErrorMsg('Kindly check the url (https://...)');
            setLoaded(loaded);
            setDisableSubmit(false);
        });
    }
    else{
      setErrorMsg('Kindly enter the website url (https://...)');
    }
    }
   return(
       <React.Fragment>
           <Container>
               <div className='centerAlign'>
                   { errorMsg && errorMsg != '' ?
                   <Row>
                       <Col>
                       <div className='columnSpacing errorMsge'>
                       {errorMsg}
                       </div>
                       </Col>
                   </Row>:''}
               <Row>
                   <div className='columnSpacing'>
                   <Col>
                   <input type='textbox' className='textbox' placeholder="Enter your Url here..." value={url} onChange={(e)=>{setUrl(e.target.value);setErrorMsg('')}} ></input>
                   </Col>
                   </div>
               </Row>
               <Row>
                   <Col>
                   <Button bsPrefix='submitButton' onClick={()=>handleSubmit()} disabled={disableSubmit} >Submit</Button>
                   </Col>
               </Row>
               <Row>
                   <Col>
                   <Loader
        loaded={loaded}
        lines={13}
        length={20}
        width={10}
        radius={30}
        corners={1}
        rotate={0}
        direction={1}
        color="#000"
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={false}
        className="spinner columnTopSpacing"
        zIndex={2e9}
        top="50%"
        left="50%"
        scale={1.0}
        loadedClassName="loadedContent"
      />
                   </Col>
                   
               </Row>
               </div>
           </Container>
       </React.Fragment>
   )   
}

export default ChildComponent;