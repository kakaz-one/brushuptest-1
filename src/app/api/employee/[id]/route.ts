import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.$connect();
    const employee = await prisma.employeeInfo.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "従業員が見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        id: employee.id,
        name: employee.name
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "従業員情報の取得に失敗しました", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 