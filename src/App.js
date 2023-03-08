import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import axios from 'axios';
import Spinner from './Components/Spinner/Spinner.js'

function App() {
  const [loaded, setLoaded] = useState(0);
  const [loader, setLoader] = useState(false);
  // const [file, setFile] = useState(null);
  // const [video, setVideo] = useState();

  const [data, setData] = useState([{
    file: null,
    video: ""
  }])

  const handleFile = (e) => {
    const updateData = [...data];
    console.log(updateData)
    const file = e.target.files[0];
    updateData[0].file = file
    //setFile(file)
    setData(updateData);
  }

  const uploadFile = async (e) => {
    e.preventDefault()
    setLoader(true);
    // let inputFile = document.getElementById("input")
    // let videoFile = document.getElementById("video")

    // const { files } = inputFile;

    // let file = files[0];

    const formData = new FormData();
    formData.append('profile', data[0].file);


    let result = await axios.post('http://localhost:4000/upload', formData, {
      onUploadProgress: progressEvent => {
        setLoaded(Math.round((progressEvent.loaded / progressEvent.total) * 100));
      },
    })

    // let result = await fetch('http://localhost:4000/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    const updateData = [...data];
    if (result.status === 200) {
      console.log("ok")
      // videoFile.src = result.data.profile_url;
      updateData[0].video = result.data.profile_url
      //setVideo(result.data.profile_url)
      setData(updateData)
    }

    setLoader(false)

  }
  return (
    <div className="App">
      <form className='form-container custom-css' id='form' onSubmit={(e) => uploadFile(e)}>
        <input className='video-file-input' id="input" type="file" onChange={(e) => handleFile(e)} name="profile" />
        <button className='submit-btn' id="btn" type="submit">Load</button>
      </form>
      <div className='video-container custom-css'>
        {loader && (<>
          <Spinner />
          <div className='progress-bar' id='progressBar'>{loaded}%</div>

        </>)}
        <video className='video-loaded' controls id="video" src={data[0].video} ></video>
      </div>
    </div>
  );
}

export default App;
