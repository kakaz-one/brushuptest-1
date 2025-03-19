'use client';

import { use } from 'react';

export default function AttendancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div>
      <h2>勤怠管理ページ</h2>
      <p>従業員ID: {id}</p>
      {/* 勤怠管理の内容をここに表示 */}
    </div>
  );
}
