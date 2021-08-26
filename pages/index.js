// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {db} from '../firebase';
import Link from 'next/link';
import { useState } from 'react';

export default function Home({Allblogs}) {
  const [blogs,setBlogs] = useState(Allblogs);
  const [end,setEnd] = useState(false);
  console.log("Data: :",Allblogs)
  // const loadMore = async() => {
  //   var first = db.collection("blogs")
  //       .orderBy("createdAt")
        

  //       return  first.get().then((documentSnapshots) => {
  //       // Get the last visible document
  //       var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  //       console.log("last", lastVisible);

  //       // Construct a new query starting at this document,
  //       // get the next 25 cities.
  //       var next = db.collection("blogs")
  //               .orderBy("createdAt")                
  //               .limit(3);

  //          console.log("Next :",next)
  //     });
   
      
  // }
  const loadMore = async ()=>{
    const last  = blogs[blogs.length-1]
    const res = await  db.collection('blogs')
    .orderBy('createdAt','desc')
    .startAfter(new Date(last.createdAt))
    .limit(3)
    .get()
    const newblogs = res.docs.map(docSnap=>{
      return {
       ...docSnap.data(),
       createdAt:docSnap.data().createdAt.toMillis(),
       id:docSnap.id
     }
    })
    setBlogs(blogs.concat(newblogs))

    if(newblogs.length < 3){
      setEnd(true)
    }
  }
  

  return (
    <div className="center">
      {
        blogs.map(blog => {
          return (
            <div className="card" key={blog.id}>
              <div className="card-image">
                <img src={blog.imageUrl} alt=""/>
                <span className="card-title">{blog.title}</span>
              </div>
              <div className="card-content">
                <p>{blog.body}</p>
              </div>
              <div className="card-action">
                <Link href= {`/blogs/${blog.id}`}><a >Read more</a></Link>
              </div>
          </div>
          )
        })
      }
      {
        end == false ?
        <button className="btn  #ff8f00 amber darken-3" onClick={loadMore}>Load More</button>
        :
        <h3>You have reached end</h3>
      }
     
      <style jsx>
       {`
        .card{
          max-width: 500px;
          margin: 22px auto;
        }
        p{
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
       `}
      </style>
    </div>
  )
}

export async function getServerSideProps(context) {
  const querySnap = await db.collection('blogs').orderBy('createdAt','desc')
  .limit(3)
  .get()
  const Allblogs = querySnap.docs.map(docSnap => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id
    }
  })
 

  return {
    props: {Allblogs}, // will be passed to the page component as props
  }
}
