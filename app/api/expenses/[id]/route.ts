import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET one expense
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const expense = await prisma.expense.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(expense);
}

// UPDATE one expense
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const expense = await prisma.expense.update({
    where: {
      id: Number(id),
    },
    data: {
      title: body.title,
      amount: Number(body.amount),
      category: body.category,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(expense);
}

// DELETE one expense
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.expense.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Expense deleted successfully!",
  });
}