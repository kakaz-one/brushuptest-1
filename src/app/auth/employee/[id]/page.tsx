'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
    // ここで従業員情報を取得するためのAPI呼び出しを行うことができます
    // 例: fetch(`/api/employee/${id}`)
  }, [id]);

  return (
    <div >
      <div >
        <h2 >従業員ページ</h2>
        <p>従業員ID: {id}</p>
        {/* 他の従業員情報をここに表示 */}
      </div>
    </div>
  );
}