'use client';

import { use, useState, useEffect } from 'react';

export default function AttendancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState('');
  const [recordType, setRecordType] = useState('出勤');
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0]); // 現在の日付を初期値に設定
  const [recordTime, setRecordTime] = useState(new Date().toLocaleTimeString('it-IT').slice(0, 5)); // 現在の時刻を初期値に設定
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 従業員情報を取得するためのAPI呼び出し
    fetch(`/api/employee/${id}`)
      .then(response => response.json())
      .then(data => setName(data.name))
      .catch(err => console.error('Error fetching employee data:', err));
  }, [id]);

  const handleClockIn = async () => {
    try {
      const response = await fetch(`/api/employee/${id}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordType, recordDate, recordTime }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('打刻が成功しました');
      } else {
        setMessage(`エラー: ${data.message}`);
      }
    } catch (err) {
      setMessage('打刻処理中にエラーが発生しました');
    }
  };

  return (
    <div>
      <h2>勤怠管理ページ</h2>
      <p>従業員氏名: {name}</p>
      <div>
        <label htmlFor="recordType">打刻タイプ:</label>
        <select
          id="recordType"
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
        >
          <option value="出勤">出勤</option>
          <option value="退勤">退勤</option>
          <option value="休憩開始">休憩開始</option>
          <option value="休憩終了">休憩終了</option>
        </select>
      </div>
      <div>
        <label htmlFor="recordDate">打刻日:</label>
        <input
          type="date"
          id="recordDate"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="recordTime">打刻時刻:</label>
        <input
          type="time"
          id="recordTime"
          value={recordTime}
          onChange={(e) => setRecordTime(e.target.value)}
        />
      </div>
      <button onClick={handleClockIn}>打刻</button>
      {message && <p>{message}</p>}
    </div>
  );
}
