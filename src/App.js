import React, {useState} from 'react';
import './App.scss';
import axios from "axios"

function App() {

  const [shURL, setSHURL] = useState("");
  const [showCopyBtn, setCopyBtnVisible] = useState(false);

  const onEnterPress = (event) => {
    if(event.key === "Enter" && event.target.validity.valid){
      
      axios.post("http://localhost:9000/.netlify/functions/index/shorten",{url: event.target.value})
        .then(response => {
          if(response.data.success == 1){
            setSHURL(`kliq.pw/${response.data.shortened}`);
            setCopyBtnVisible(true);
          }
          else{
            setSHURL("Error while creating link, please try again");
            setCopyBtnVisible(false);
          }
        })
        .catch(err => {
          console.error("Error: ",err);
          setSHURL("Error while creating link, please try again");
          setCopyBtnVisible(false);
        })
      
    }
  };

  const copyURL = (event) => {
    if(window.navigator.clipboard.writeText){

      window.navigator.clipboard.writeText(shURL).then(() => {
        let url = shURL;
        setSHURL("Copied to clipboard");
        setCopyBtnVisible(false);
        setTimeout(() => {
          setSHURL(url);
          setCopyBtnVisible(true);
        },2000);
      });

    }
    else{
      console.log('select text');
    }
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="title">Link Shortener</div>
        <div className="input-div">
          <input type="url" name="link" id="link-input" className="input" placeholder="Paste link and press Enter..." onKeyPress={onEnterPress}/>
        </div>
        <div className="result">
          <div className="sh-link">{shURL}</div>
          {showCopyBtn && <div className="copy-btn" onClick={copyURL}></div>}
        </div>
      </div>
    </div>
  );
}


export default App;
