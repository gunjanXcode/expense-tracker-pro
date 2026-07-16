import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all expenses
export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(expenses);
}

// CREATE a new expense
export async function POST(request: Request) {
  const body = await request.json();

  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: Number(body.amount),
      category: body.category,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(expense);
}