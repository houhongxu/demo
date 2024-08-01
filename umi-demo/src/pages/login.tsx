import React, { useState } from 'react';
import { history } from 'umi';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status !== 200) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      alert(`欢迎回来，${data.name}`);
      history.push('/posts/create');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <p>邮箱</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>密码</p>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submit}>登入</button>
      </div>
    </div>
  );
}
