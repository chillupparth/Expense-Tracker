"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();
  if (!userId)
    return {
      error: "User not found",
    };

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((sum, item) => sum + item, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((sum, item) => sum + item, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "Databse : Something went wrong" };
  }
}

export default getIncomeExpense;
