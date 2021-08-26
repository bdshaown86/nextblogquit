import { db } from "../../firebase"
import { useState } from "react"
import { useRouter } from "next/router"



const blogpage = ({blog,user,allComments}) => {
    const [mycomment, setMycomment] = useState("");
    const [allCommentsBlog,setAllCommentsBlog] = useState(allComments)
    const router = useRouter();

    const {blogid} = router.query;

    const makeComment = async() => {
       await db.collection('blogs').doc(blogid).collection('comments').add({
            text: mycomment,
            name: user.displayName
        })
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllCommentsBlog(commentQuery.docs.map(docSnap => docSnap.data()))
        setMycomment("")
    }
    return (

        <div className="container center">
            <h2>{blog.title}</h2>
            <h5>Created On - {new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl} alt="" style={{width:'200px',height:'200px'}} />
            <p>{blog.body}</p>
            {

            
            user ?
            <>
               <div className="input-field">
                  <input type="text" placeholder="Add a comment..."
                  value={mycomment}
                   onChange={(e) => setMycomment(e.target.value) }
                />
              </div>
              <button className="btn  #ff8f00 amber darken-3" onClick={makeComment}>Make Comment</button>
            </>
            :
            <h3>Please login to make comments</h3>
            }
           
            <hr />
            <div className="left-align">
                {
                  allCommentsBlog.map((item,index) => {
                      return <h6 key={index}><span>{item.name}</span> {item.text} </h6>
                  })
                }
            </div>
            <style jsx global>
             {`
              body{
                  color: orange;
              }
              span{
                  font-weight: 500;
              }
             `}
            </style>
            
        </div>
    )
}

export default blogpage

export async function getServerSideProps({params:{blogid}}) {
  const result = await db.collection("blogs").doc(blogid).get()

  const allCommentsSnap = await db.collection('blogs').doc(blogid).collection('comments').get();
  const allComments = allCommentsSnap.docs.map(comDocSnap => comDocSnap.data() )
     
  
    return {
      props: {
          blog:{
              ...result.data(),
              createdAt: result.data().createdAt.toMillis()
          },
          allComments
      }, 
    }
  }
  
