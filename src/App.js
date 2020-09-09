import React, {useState} from 'react';
import './App.scss';

function App() {

  const [shURL, setSHURL] = useState("");
  const [showCopyBtn, setCopyBtnVisible] = useState(false);

  const onEnterPress = (event) => {
    if(event.key === "Enter" && event.target.validity.valid){
      setSHURL("shli.cc/padsf");
      setCopyBtnVisible(true);
    }
  };

  const copyURL = (event) => {
    window.navigator.clipboard.writeText(shURL).then(() => {
      let url = shURL;
      setSHURL("Copied to clipboard");
      setCopyBtnVisible(false);
      setTimeout(() => {
        setSHURL(url);
        setCopyBtnVisible(true);
      },2000);
    })
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
