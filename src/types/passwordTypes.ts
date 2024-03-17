import { randomCharValueTypes, randomValueBlockTypes } from "../helpers/passwordGenerator";

export type RandomValueBlockTypes = keyof typeof randomValueBlockTypes;

export type RandomCharValueType = keyof typeof randomCharValueTypes;

export type GettingRandomChar = (randomCharValueType: RandomCharValueType) => string;
