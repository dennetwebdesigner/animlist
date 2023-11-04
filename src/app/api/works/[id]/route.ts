import { prisma } from "@/config/prisma";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  const work = (await prisma.store.findFirst({ where: { id } })) as any;
  return new Response(JSON.stringify(work));
}
