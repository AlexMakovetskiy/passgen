import { useState } from "react";
import styles from "./App.module.scss";
import useClipboard from "./hooks/useClipboard";
import { RandomValueBlockTypes, alphabet, numbers, randomValueBlockTypes } from "./helpers/passwordGenerator";

function App() {
	const [cognitiveGeneratorValue, setCognitiveGeneratorValue] = useState<string>("value");

	const { copyToClipBoard } = useClipboard(500);

	function getRandomValue2or3() {
		return Math.random() < 0.5 ? 2 : 3;
	}

	function getRandomValue3or4() {
		return Math.random() < 0.5 ? 3 : 4;
	}

	function getRandomCharacter() {
		return Math.round(Math.random())
			? (alphabet[Math.ceil(Math.random() * 23)] ?? "f").toUpperCase()
			: alphabet[Math.ceil(Math.random() * 23)] ?? "k";
	}

	function getRandomValueBlock(randomValueBlockType: RandomValueBlockTypes, valueLength: number) {
		if (randomValueBlockType === randomValueBlockTypes.string) {
			const firstPart = getRandomCharacter() + getRandomCharacter();
			return valueLength === 3 ? firstPart + (getRandomCharacter() ?? "r") : firstPart;
		}

		const firstPart = (numbers[Math.round(Math.random() * 9)] ?? "5") + (numbers[Math.round(Math.random() * 9)] ?? "7");

		return valueLength === 3 ? firstPart + (numbers[Math.round(Math.random() * 9)] ?? "9") : firstPart;
	}

	function getCognitiveTypePassword() {
		const firstStringBlock = getRandomValueBlock(randomValueBlockTypes.string, getRandomValue2or3());
		const firstNumberBlock = getRandomValueBlock(randomValueBlockTypes.number, getRandomValue2or3());
		const secondStringBlock = getRandomValueBlock(randomValueBlockTypes.string, getRandomValue2or3());

		return (
			firstStringBlock +
			firstNumberBlock +
			secondStringBlock +
			(getRandomValue3or4() === 4 ? getRandomValueBlock(randomValueBlockTypes.number, getRandomValue2or3()) : "")
		);
	}

	function generateCognitiveType() {
		setCognitiveGeneratorValue(getCognitiveTypePassword() ?? "");
		return getCognitiveTypePassword();
	}

	return (
		<main className={styles.appWrap}>
			<div className={styles.appContainer}>
				<h1 className={styles.appContainer__title}>Password generator</h1>
				<div className={styles.generatorWrap}>
					<h4 className={styles.generatorWrap__firstTypeTitle}>Cognitive type:</h4>
					<div className={styles.firstTypeWrap}>
						<span className={styles.firstTypeWrap__valueField}>{cognitiveGeneratorValue}</span>
						<button onClick={generateCognitiveType}>Generate</button>
						<button onClick={() => copyToClipBoard(cognitiveGeneratorValue)}>copy</button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
