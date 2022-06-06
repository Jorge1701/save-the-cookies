const SAVES_KEY = 'slots';

function setSave(newSave, onDone) {
	getSaves((saves) => {
		if (saves.filter(save => save.name === newSave.name).length > 0) {
			saves = saves.map(save => {
				if (save.name !== newSave.name) {
					return save;
				} else {
					return newSave;
				}
			});
		} else {
			saves.push(newSave);
		}

		setSaves(saves, onDone);
	});
}

function getSave(saveName, onResult) {
	getSaves((saves) => {
		onResult(saves.filter(save => save.name === saveName)[0]);
	});
}

function deleteSave(saveName, onDone) {
	getSaves((saves) => {
		setSaves(saves.filter(save => save.name !== saveName), onDone);
	});
}

function setSaves(saves, onDone) {
	(async () => {
		let saveObject = {};
		saveObject[SAVES_KEY] = saves;
		chrome.storage.sync.set(saveObject, onDone);
	})();
}

function getSaves(onResult) {
	(async () => {
		chrome.storage.sync.get([SAVES_KEY], (result) => {
			let saves = result[SAVES_KEY];
			if (saves === undefined) {
				onResult([]);
			} else {
				onResult(saves);
			}
		});
	})();
}