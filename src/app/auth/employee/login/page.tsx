'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/employee', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('API Response:', data); // デバッグ用ログ

      if (!response.ok) {
        setError(data.message);
        return;
      }

      const employee = data.employees.find(
        (emp: { id: number; password: string }) =>
          emp.id === parseInt(id) && emp.password === password
      );

      console.log('Matched Employee:', employee); // デバッグ用ログ

      if (!employee) {
        setError('従業員IDまたはパスワードが正しくありません');
        return;
      }

      // ログイン成功時の処理
      router.push(`/auth/employee/${employee.id}`); // 該当の従業員ページへリダイレクト
    } catch (err) {
      console.error('Error during login:', err); // デバッグ用ログ
      setError('ログイン処理中にエラーが発生しました');
    }
  };

  return (
    <div>
      <div>
        <h2>従業員ログイン</h2>
        {error && (
          <div>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="id">
              従業員ID
            </label>
            <input
              id="id"
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
