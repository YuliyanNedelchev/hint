import { NextRequest, NextResponse } from "next/server";
import { OpenAIService } from "../services/openAI";

export async function POST(req: NextRequest) {
	try {
		const openAIServices = new OpenAIService();
		const personInformation = await req.json();

		const answer = await openAIServices.analyzePerson(personInformation);
		//eslint-disable-next-line no-console

		return NextResponse.json(Object.values(answer), { status: 200 });
	} catch (error) {
		console.log(error);

		return (
			NextResponse.json({ message: "Error importing data", error }),
			{ status: 500 }
		);
	}
}
