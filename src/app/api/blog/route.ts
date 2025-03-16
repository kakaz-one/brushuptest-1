// PrismaClient と Prisma 型を @prisma/client からインポート
import { PrismaClient } from "@prisma/client";
// データベース操作に必要なクラスと型定義をインポートしています

// Next.js のレスポンスを管理する NextResponse をインポート
import { NextResponse} from "next/server";
// APIレスポンスを生成するためのNextResponse機能をインポートしています

const prisma = new PrismaClient();
// PrismaClientのインスタンスを作成し、データベース操作用のクライアントを初期化します

export async function main () {
  // データベース接続を確立する関数を定義します
  try {
    await prisma.$connect();
    // データベースへの接続を試みます
  } catch (err) {
    return Error("DB接続に失敗しました");
    // 接続に失敗した場合、エラーメッセージを返します
  }
}

//ブログ全記事取得のAPI
export const GET = async (req:Request, res:NextResponse) => {
  // HTTP GETリクエストを処理する関数を定義します
  try {
    await main();
    // データベース接続を確立します
    const posts = await prisma.post.findMany();
    // データベースから全ての投稿を取得します
    return NextResponse.json({message: "Success", posts}, {status: 200});
    // 取得した投稿データを成功レスポンスとして返します
  } catch (err) {
    return NextResponse.json({message: "Failed", err}, {status: 500});
    // エラーが発生した場合、エラーレスポンスを返します
  } finally {
    await prisma.$disconnect();
    // 処理完了後、データベース接続を切断します
  }
};