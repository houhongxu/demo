import React, { useEffect, useState } from 'react';
import { history } from 'umi';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!document.cookie.includes('token')) {
      alert('请先登录');
      history.push('/login');
    }
  }, []);

  async function submit() {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(','),
          imageUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) {
        console.error(await res.text());
        alert('发布失败');
        return;
      }
      history.push('/posts/' + (await res.json()).id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <p>发表新文章</p>
      <p>标题</p>
      <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
      <p className="mt-8">内文</p>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <p className="mt-8">标签 (以逗号隔开)</p>
      <input value={tags} onChange={(e) => setTags(e.target.value)} />
      <p className="mt-8">封面图片地址</p>
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <img src={imageUrl} alt="" />
      <button onClick={submit}>发布</button>
    </div>
  );
}
