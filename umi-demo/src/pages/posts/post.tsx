import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

export default function Page() {
  const params = useParams();
  const [post, setPost] = useState<any>();

  async function refresh() {
    try {
      const res = await fetch('/api/posts/' + params.postId);
      if (res.status === 200) {
        const post = await res.json();
        setPost(post);
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  if (post === null) {
    return <div>Post with ID {params.postId} not found.</div>;
  }

  return (
    <div>
      {post === undefined && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {post && (
        <>
          <div>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                className="absolute top-0 w-full h-full object-cover"
                alt=""
              />
            )}
            <div>
              <p>{post.title}</p>
              <div>
                <img
                  src={post.author.avatarUrl}
                  className="rounded-full h-8 w-8 mr-4"
                  alt=""
                />
                <p>{post.author.name}</p>
                <p>{post.createdAt.split('T')[0]}</p>
              </div>
            </div>
          </div>
          <div>
            <div>{post.content}</div>
          </div>
        </>
      )}
    </div>
  );
}
