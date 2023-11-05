import { prisma } from "@/config/prisma";

export async function PUT(request: Request) {
  const { id, cap } = await request.json();
  const list = (await prisma.list.update({
    where: { id: id } as any,
    data: { cap: cap },
  })) as any;
  return new Response(JSON.stringify(list));
}

export async function POST(request: Request) {
  const { cap, emailId, storeId } = await request.json();
  const list = (await prisma.list.create({
    data: { cap, emailId, storeId },
  })) as any;
  return new Response(JSON.stringify(list));
}

export async function GET(request: Request) {
  return new Response(JSON.stringify({}));
}
