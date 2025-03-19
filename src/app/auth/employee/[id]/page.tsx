'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [name, setName] = useState('');

  useEffect(() => {
    // 従業員情報を取得するためのAPI呼び出し
    fetch(`/api/employee/${id}`)
      .then(response => response.json())
      .then(data => setName(data.name))
      .catch(err => console.error('Error fetching employee data:', err));
  }, [id]);

  return (
    <div>
      <div>
        <h2>従業員ページ</h2>
        <p>従業員氏名: {name}</p>
        <div>
          <button onClick={() => router.push(`/auth/employee/${id}/attendance`)}>勤怠管理</button>
          <button onClick={() => router.push(`/auth/employee/${id}/sharing`)}>情報共有</button>
        </div>
      </div>
    </div>
  );
}