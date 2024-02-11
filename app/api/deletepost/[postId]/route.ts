import { deletePostById } from "@/app/lib/actions";
import { NextResponse } from "next/server";
export async function POST(request: Request, context: any) {
  const { params } = context;
  const { postId } = params;
  const res = await deletePostById(params.postId);
  return NextResponse.json(res);
}
