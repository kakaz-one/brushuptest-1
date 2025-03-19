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

// 従業員ログインのAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const { id, password } = await req.json();

    const employee = await prisma.employeeInfo.findFirst({
      where: {
        id: parseInt(id),
        password: password,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "従業員IDまたはパスワードが正しくありません" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        message: "ログイン成功",
        employee: {
          id: employee.id,
          name: employee.name
        }
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "ログイン処理に失敗しました", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}; 