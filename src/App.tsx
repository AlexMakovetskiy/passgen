import { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

import useClipboard from "./hooks/useClipboard";

import { getCognitiveTypePassword, getRandomTypePassword } from "./utils/passUtils";
import { platinumColor } from "./helpers/passwordGenerator";

import styles from "./App.module.scss";

function App() {
	const [checked, setChecked] = useState<boolean>(false);
	const [cognitiveGeneratorValue, setCognitiveGeneratorValue] = useState<string>(getCognitiveTypePassword());
	const [randomGeneratorValue, setRandomGeneratorValue] = useState<string>(getRandomTypePassword(checked));

	const copyDelay = 500;
	const { copyToClipBoard } = useClipboard(copyDelay);

	function toggleSpecialChars() {
		return setChecked(!checked);
	}

	function generateCognitiveType() {
		return setCognitiveGeneratorValue(getCognitiveTypePassword());
	}

	function generateRandomType() {
		return setRandomGeneratorValue(getRandomTypePassword(checked));
	}

	return (
		<main className={styles.appWrap}>
			<div className={styles.appContainer}>
				<h1 className={styles.appContainer__title}>Password generator</h1>
				<div className={styles.generatorWrap}>
					<div className={styles.generatorContainer}>
						<h4 className={styles.generatorContainer__firstTypeTitle}>Cognitive type:</h4>
						<div className={styles.firstTypeWrap}>
							<span className={styles.firstTypeWrap__valueField}>{cognitiveGeneratorValue}</span>
							<div className={styles.actionElementsWrap}>
								<button onClick={generateCognitiveType} className={styles.generateAction}>
									Generate
								</button>
								<button onClick={() => copyToClipBoard(cognitiveGeneratorValue ?? "")} className={styles.copyAction}>
									<AiOutlineCopy size={30} color={platinumColor} />
								</button>
							</div>
						</div>
						<h4 className={styles.generatorContainer__secondTypeTitle}>Random type:</h4>
						<div className={styles.secondTypeWrap}>
							<span className={styles.secondTypeWrap__valueField}>{randomGeneratorValue}</span>
							<div className={styles.actionElementsWrap}>
								<button onClick={generateRandomType} className={styles.generateAction}>
									Generate
								</button>
								<button onClick={() => copyToClipBoard(cognitiveGeneratorValue ?? "")} className={styles.copyAction}>
									<AiOutlineCopy size={30} color={platinumColor} />
								</button>
							</div>
						</div>
						<input
							type="checkbox"
							name="specialCharacters"
							id="specialCharacters"
							className={styles.specialCharsToggler}
							checked={checked}
							onClick={toggleSpecialChars}
							readOnly={true}
						/>
						<label htmlFor="specialCharacters" className={styles.specialCharsTitle}>
							Special characters?
						</label>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
