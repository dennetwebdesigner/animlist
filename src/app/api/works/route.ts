import { prisma } from "@/config/prisma";

export async function GET(request: Request) {
  const works = (await prisma.store.findMany()) as any;
  return new Response(JSON.stringify(works));
}

export async function Post(request: Request) {
  try {
    const body = request.json();
    const work = await prisma.store.create({ data: body as any });
    return new Response(JSON.stringify(work));
  } catch (error: any) {
    return new Response(JSON.stringify({ error }));
  }
}
