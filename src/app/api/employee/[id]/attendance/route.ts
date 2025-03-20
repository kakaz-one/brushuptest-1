import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.$connect();
    const { recordType, recordDate, recordTime } = await req.json();

    // クライアントから送信された日付と時刻をUTCとして解釈
    const [year, month, day] = recordDate.split('-').map(Number);
    const [hours, minutes] = recordTime.split(':').map(Number);
    const recordDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    const newRecord = await prisma.timeRecord.create({
      data: {
        employee_id: parseInt(params.id),
        record_type: recordType,
        record_time: recordDateTime,
      },
    });

    return NextResponse.json(
      { message: "打刻が成功しました", record: newRecord },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "打刻処理に失敗しました", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
