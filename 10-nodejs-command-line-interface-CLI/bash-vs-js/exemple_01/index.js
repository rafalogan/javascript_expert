const { existsSync, mkdirSync, rmSync } = require('fs');
const {execSync} = require('child_process');

const getFolderName = index => (index >= 3) ? `js-0${index}` : `mjs-0${index}`;
const rmFolder = folderName => rmSync(`./${folderName}`, {recursive: true});

const makeDirAndRetundname = (folderName) => {
	if (existsSync(folderName)) rmFolder(folderName);
	mkdirSync(folderName);
	return folderName;
}

const initializerPackage = folderName => {
	execSync(`npm init -y --scop @rafalogan  --silent`, {cwd: `./${folderName}`});
	return folderName;
}

const printNameAndPackageVersion = folderName => {
	const {name, version} =  require(`./${folderName}/package.json`);
	console.log({ n: name, v: version});

	return folderName;
}

const FOLDER_AMOUNT = 4;
Array.from(Array(FOLDER_AMOUNT).keys())
	.map(index => makeDirAndRetundname(getFolderName(index + 1)))
	.map(initializerPackage)
	.map(printNameAndPackageVersion)
	.map(rmFolder);
