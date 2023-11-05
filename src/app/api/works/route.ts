import { prisma } from "@/config/prisma";

type WorksType = {
  name: string;
  description: string;
  img: string;
  categories: string[];
};

export async function GET(request: Request) {
  const works = (await prisma.store.findMany()) as any;
  return new Response(JSON.stringify(works));
}

export async function POST(request: Request) {
  const body = await request.json();

  const work = await prisma.store.create({
    data: body,
  });
  return new Response(JSON.stringify(work));
}
