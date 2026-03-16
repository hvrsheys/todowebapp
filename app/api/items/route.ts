import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Item } from "@/models/Item";

export async function GET() {
  await connectDB();
  const items = await Item.find().sort({ createdAt: -1 }).limit(50);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const item = await Item.create({
    title:       body.title,
    description: body.description,
  });

  return NextResponse.json(item, { status: 201 });
}
