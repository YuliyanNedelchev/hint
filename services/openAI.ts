import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { OpenAI } from "@langchain/openai";
import { HintGeneratorTemplate } from "./prompt";
import {
	OutputFixingParser,
	StructuredOutputParser,
} from "langchain/output_parsers";
import { z } from "zod";

interface PersonInformation {
	country: string;
	budget: string;
	gender: string;
	occasion: string;
	interest: string;
	additionalInfo: string;
	date: string;
}

export class OpenAIService {
	model = new OpenAI({
		openAIApiKey: process.env.OPENAI_API_KEY,
		temperature: 0,
		modelName: "gpt-4-0125-preview",
	});

	async analyzePerson(personInformation: PersonInformation) {
		const parser = StructuredOutputParser.fromZodSchema(
			z.array(
				z.object({
					title: z.string().describe("title"),
					description: z.string().describe("description"),
					summary: z.string().describe("summary"),
					wish: z.string().describe("wish"),
					link: z.string().describe("link"),
				})
			)
		);
		const taskPrompt = PromptTemplate.fromTemplate(HintGeneratorTemplate);

		const taskChain = taskPrompt
			.pipe(this.model)
			.pipe(new StringOutputParser());

		const rawAnswer = await taskChain.invoke({
			...personInformation,
			task_instructions: parser.getFormatInstructions(),
		});

		const currentAnswer = await this.getParser(parser).parse(rawAnswer);

		return currentAnswer;
	}

	getParser(parser: StructuredOutputParser<any>) {
		return OutputFixingParser.fromLLM(this.model, parser);
	}
}
