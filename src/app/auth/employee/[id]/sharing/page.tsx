'use client';

import { use, useState, useEffect } from 'react';

export default function SharingPage({ params }: { params: Promise<{ id: string }> }) {
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
      <h2>情報共有ページ</h2>
      <p>従業員氏名: {name}</p>
      {/* 情報共有の内容をここに表示 */}
    </div>
  );
}
