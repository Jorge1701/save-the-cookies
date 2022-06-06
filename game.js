function loadGameData(gameData) {
	runOnCurrentTab([gameData], (data) => {
		Game.LoadSave(data);
	});
}

function getCurrentGameData(onResult) {
	runOnCurrentTab([], () => {
		Game.WriteSave();
		return localStorageGet(Game.SaveTo);
	}, onResult);
}

/**
 * @param func		Function to be executed in 'MAIN' context, this will have access to the current tab values and functions.
 * @param onResult	Function to be called with the result of the func function.
 */
function runOnCurrentTab(args, func, onResult) {
	(async () => {
		// Gets current tab
		let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		// Execute func in current tab with world: 'MAIN' which gives it access to the current tab context
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			world: 'MAIN',
			args: args,
			function: func
		}, (result) => {
			// Pass the result
			onResult(result[0].result);
		});
	})();
}