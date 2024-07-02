const fs = require('fs')

// Function to read a JSON file
const readJsonFile = (filePath) => {
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

// Function to write to a JSON file
const writeJsonFile = (filePath, data) => {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Main function to merge navigation into mint
const mergeNavigationIntoMint = () => {
	const navigationPath = '../sdk/content/navigation.json'
	const mintPath = '../mint.json'

	// Read both JSON files
	const navigation = readJsonFile(navigationPath)
	const mint = readJsonFile(mintPath)

	// Find the Reference group in mint.json
	const referenceGroup = mint.navigation.find((group) => group.group === 'Reference')

	if (referenceGroup) {
		// Replace the pages value with the content from navigation.json
		referenceGroup.pages = navigation
	} else {
		console.error('Reference group not found in mint.json')
		return
	}

	// Write the updated mint.json back to the file
	writeJsonFile(mintPath, mint)

	console.log('Successfully merged navigation into mint.json')
}

// Execute the main function
mergeNavigationIntoMint()
