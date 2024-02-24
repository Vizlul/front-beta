import { NextResponse } from "next/server";
import { connectToDatabase } from "../db";

export async function GET(request) {
  const connection = await connectToDatabase();
  try {
    const [results] = await connection.query("SELECT * FROM users");
    return NextResponse.json({ message: "Success", data: results }, { status: 200 });
  } finally {
    connection.end(); // Close the connection after executing the query
  }
}

export async function POST(request) {
  const res = await request.json();

  const connection = await connectToDatabase();
  try {
    const [results] = await connection.query("INSERT INTO users (name, chance) VALUES (?, ?)", [
      res.name,
      res.chance,
    ]);
    return NextResponse.json({ message: "yakhchi" }, { status: 200 });
  } finally {
    connection.end(); // Close the connection after executing the query
  }
}
