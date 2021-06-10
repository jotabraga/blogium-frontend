import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const request = axios.get('http://localhost:4001/');
    request.then((response)=>{setPosts(response.data)});  
    request.catch((r)=> console.log(r));  
  }, []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
