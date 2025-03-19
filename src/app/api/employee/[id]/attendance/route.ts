import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.$connect();
    const { recordType, recordDate } = await req.json();

    const newRecord = await prisma.timeRecord.create({
      data: {
        employee_id: parseInt(params.id),
        record_type: recordType,
        record_time: new Date(recordDate),
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
