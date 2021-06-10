import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useHistory, useParams } from "react-router-dom";
import PostManipulation from "./PostManipulation/PostManipulation";

export default function PostEditPage() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [content, setContent] = useState("");
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const request = axios.get(`http://localhost:4001/posts/${postId}`);
    request.then((response) => {
      setTitle(response.data.title);
      setCoverUrl(response.data.coverUrl);
      setContent(response.data.contentPreview);
    });
    request.catch((response) => console.log(response));
  }, [postId]);

  function onPostSaveButtonClick() {
    const body = {
      title,
      coverUrl,
      contentPreview: content,
    };
    const request = axios.put(`http://localhost:4001/posts/${postId}`, body);
    request.then((response) => {
      setSaveButtonDisable(true);
      history.push(`/posts/${postId}`);
    });
    request.catch((response) => {
      console.log(response);
    });
  }

  if (!content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
      isSaveButtonDisabled={isSaveButtonDisabled}
    />
  );
}
