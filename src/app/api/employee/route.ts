import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// 従業員情報全件取得のAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const employees = await prisma.employeeInfo.findMany();
    return NextResponse.json(
      { message: "Success", employees }, 
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed", err }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}; 