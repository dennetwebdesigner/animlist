import { prisma } from "@/config/prisma";

export async function GET(request: Request) {
  return new Response(JSON.stringify({ users: "test" }));
}
