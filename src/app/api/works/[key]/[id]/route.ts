import { prisma } from "@/config/prisma";

export async function GET(request: Request, { params }: any) {
  const key = params.key;
  const id = params.id;

  const work = (await prisma.store.findFirst({
    where: {
      [key]: id,
    },
  })) as any;
  return new Response(JSON.stringify(work));
}

export async function POST(request: Request, { params }: any) {
  const key = params.key;
  const id = params.id;

  const { user } = await request.json();
  const work = (await prisma.store.findFirst({
    where: {
      [key]: id,
    },
    include: {
      List: {
        where: {
          emailId: user,
        },
      },
    },
  })) as any;
  return new Response(JSON.stringify(work));
}

export async function PUT(request: Request, { params }: any) {
  const key = params.key;
  const id = params.id;
  const body = await request.json();

  const work = (await prisma.store.update({
    where: { [key]: id } as any,
    data: body,
  })) as any;
  return new Response(JSON.stringify(work));
}
