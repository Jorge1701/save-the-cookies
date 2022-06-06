let newSaveButton = document.getElementById('newSaveButton');
let newSaveName = document.getElementById('newSaveName');

let showSave = document.getElementById('showSave');
let btnHideDetails = document.getElementById('btnHideDetails');
let showSaveName = document.getElementById('showSaveName');
let showSaveData = document.getElementById('showSaveData');

window.onload = () => {
	updateSaves();
};

newSaveButton.addEventListener('click', () => {
	getCurrentGameData((gameData) => {
		if (gameData) {
			saveAs(newSaveName.value, gameData);
			newSaveName.value = '';
		}
	});
});

function saveAs(name, gameData) {
	setSave({
		name: name,
		data: gameData,
		date: new Date().getTime()
	}, () => {
		updateSaves();
	});
}

function updateSaves() {
	getSaves((saves) => {
		renderSaves(saves);
	});
}

function renderSaves(saves) {
	let listOfSaves = document.getElementById('listOfSaves');
	let saveRow = document.getElementById('saveRow');

	listOfSaves.innerHTML = '';

	saves.forEach(save => {
		let clone = saveRow.content.cloneNode(true);

		clone.querySelector('.saveName').textContent = save.name;
		clone.querySelector('.saveDate').textContent = save.date;

		clone.querySelector('.btnSave').onclick = () => {
			getCurrentGameData((gameData) => {
				if (gameData) {
					saveAs(save.name, gameData);
				}
			});
		};

		clone.querySelector('.btnLoad').onclick = () => {
			loadGameData(save.data);
		};
		clone.querySelector('.btnShowSave').onclick = () => {
			showDetails(save);
		};
		clone.querySelector('.btnDelete').onclick = () => {
			deleteSave(save.name, updateSaves);
		};
	
		listOfSaves.appendChild(clone);
	});
}

btnHideDetails.addEventListener('click', () => {
	showSave.style.display = 'none';
});

function showDetails(save) {
	showSaveName.innerHTML = save.name;
	showSaveData.innerHTML = save.data;
	showSave.style.display = 'block';
}