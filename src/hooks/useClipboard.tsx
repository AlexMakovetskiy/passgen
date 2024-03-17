import { useCallback, useEffect, useState } from "react";

function useClipboard(delay?: number) {
	const [copiedValue, setCopiedValue] = useState<boolean>(false);

	const copyToClipBoard = useCallback(async (text: string) => {
		await navigator.clipboard.writeText(text);
		setCopiedValue(true);
	}, []);

	useEffect(() => {
		if (delay && copiedValue) {
			const timeout = setTimeout(() => setCopiedValue(false), delay);

			return () => clearTimeout(timeout);
		}
	}, [delay, copiedValue, setCopiedValue]);

	return { copiedValue, copyToClipBoard };
}

export default useClipboard;
