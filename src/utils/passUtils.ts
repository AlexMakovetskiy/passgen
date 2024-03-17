import {
	alphabet,
	numbers,
	randomCharValueTypes,
	randomValueBlockTypes,
	specialChars,
} from "../helpers/passwordGenerator";
import { GettingRandomChar, RandomValueBlockTypes } from "../types/passwordTypes";

const maxBlockValue = 3;

const fourIndex = 4;
const sixIndex = 6;

export function getRandomTextLineLength(): number {
	const startRandomValueLengthNumber = 8;
	return Math.round(Math.random() * startRandomValueLengthNumber) + startRandomValueLengthNumber;
}

export function getRandomValueFromPair(firstChar: string, secondChar: string): string {
	const halfMaxMathRandomValue = 0.5;
	return Math.random() < halfMaxMathRandomValue ? firstChar : secondChar;
}

export const getRandomChar: GettingRandomChar = (randomCharValueType) => {
	if (randomCharValueType === randomCharValueTypes.stringValue) {
		return Math.round(Math.random())
			? (alphabet[Math.ceil(Math.random() * alphabet.length)] ?? "f").toUpperCase()
			: alphabet[Math.ceil(Math.random() * alphabet.length)] ?? "k";
	}

	return randomCharValueType === randomCharValueTypes.numberValue
		? numbers[Math.ceil(Math.random() * numbers.length)] ?? "5"
		: specialChars[Math.ceil(Math.random() * specialChars.length)] ?? "%";
};

export function getRandomValueBlock(randomValueBlockType: RandomValueBlockTypes, valueLength: number) {
	if (randomValueBlockType === randomValueBlockTypes.string) {
		const firstPart = getRandomChar("stringValue") + getRandomChar("stringValue");
		return valueLength === maxBlockValue ? firstPart + getRandomChar("stringValue") : firstPart;
	}

	const firstPart = getRandomChar("numberValue") + getRandomChar("numberValue");

	return valueLength === maxBlockValue ? firstPart + getRandomChar("numberValue") : firstPart;
}

export function getCognitiveTypePassword(): string {
	const firstStringBlock = getRandomValueBlock(randomValueBlockTypes.string, +getRandomValueFromPair("3", "4"));
	const firstNumberBlock = getRandomValueBlock(randomValueBlockTypes.number, +getRandomValueFromPair("3", "4"));
	const secondStringBlock = getRandomValueBlock(randomValueBlockTypes.string, +getRandomValueFromPair("3", "4"));

	return (
		firstStringBlock +
		firstNumberBlock +
		secondStringBlock +
		(getRandomValueFromPair("3", "4") === "4"
			? getRandomValueBlock(randomValueBlockTypes.number, +getRandomValueFromPair("3", "4"))
			: "")
	);
}

export function getRandomTypePassword(checked: boolean): string {
	const passwordLength: number = getRandomTextLineLength();

	const resultPassword: string[] = [];

	for (let i = 0; i < passwordLength; i++) {
		if (i === fourIndex && checked) {
			resultPassword[i] = getRandomChar("specialValue");
			continue;
		}
		if (i === sixIndex && checked) {
			resultPassword[i] = getRandomChar("specialValue");
			continue;
		}
		resultPassword[i] =
			getRandomValueFromPair("1", "2") === "1" ? getRandomChar("stringValue") : getRandomChar("numberValue");
	}

	return resultPassword.join("");
}
