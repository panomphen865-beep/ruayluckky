import { NextResponse } from "next/server";
import { paymentMethods } from "@/lib/payment-config";

export async function GET() {
  return NextResponse.json({ ok: true, methods: paymentMethods });
}
