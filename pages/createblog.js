import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { storage,db,serverTimestamp } from "../firebase";

const createblog = ({user}) => {
 const [title,setTitle] = useState('')
 const [body,setBody] = useState('')
 const [image,setImage] = useState('')
 const [url,setUrl] = useState('')

 useEffect(() => {
   try {
    if(url){
      db.collection('blogs').add({
        title,
        body,
        imageUrl: url,
        postedBy: user.uid,
        createdAt: serverTimestamp()
      })
     }
     M.toast({html: "Blog created at database",classes: "green"}); 
     setTitle("")
   } catch (err) {
      M.toast({html: "Error creating blog",classes: "red"}); 
   }

 },[url])

 const submitDetails = () => {
     if(!title || !body || !image){
         return M.toast({html: "Please Add all fields",classes: "red"}); 
     }
     var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image);
     uploadTask.on('state_changed', 
     (snapshot) => {    
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress == "100") M.toast({html: "Image Uploaded",classes: "green"});  
    
  
  }, 
  (error) => {
    M.toast({html: error.message,classes: "red"});  
  }, 
  () => {
   
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      setUrl(downloadURL)

    });
  }
);
 }
    return (
        <div className="input-field rootdiv">
          <input
            type="text"
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
               type="text"
               value={body}
               placeholder="body..."
               onChange={(e) => setBody(e.target.value)}
          />
          <div className="file-field input-field">
            <div className="btn #fb8c00 orange darken-1">
                <span>File</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0 ]) }/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
            </div>
          </div>
          <button type="submit" className="btn  #ff8f00 amber darken-3" onClick={submitDetails}>Submit Post</button>

          <style jsx>
           {`
             .rootdiv{
                 margin: 30px auto;
                 max-width: 600px;
                 padding: 20px;
                 text-align: center;
             }
           `}

          </style>
            
        </div>
    )
}

export default createblog
