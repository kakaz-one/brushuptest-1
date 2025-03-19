'use client';

import { use, useState, useEffect } from 'react';

export default function AttendancePage({ params }: { params: Promise<{ id: string }> }) {
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
      <h2>勤怠管理ページ</h2>
      <p>従業員氏名: {name}</p>
      {/* 勤怠管理の内容をここに表示 */}
    </div>
  );
}
