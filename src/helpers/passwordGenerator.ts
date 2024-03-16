export const alphabet = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"j",
	"k",
	"m",
	"n",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
] as const;
export const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

export const randomValueBlockTypes = {
	number: "number",
	string: "string",
} as const;

export type RandomValueBlockTypes = keyof typeof randomValueBlockTypes;
