// memo: for google app script

function getCategories() {
  // Initialization
  const email = "client_email";
  const key = "private_key";
  const projectId = "project_id";
  let firestore = FirestoreApp.getFirestore(email, key, projectId);

  // get document data from spreadsheet
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheetName = "Categories";
  let sheet = spreadsheet.getSheetByName(sheetName);

  // get the last row and column in order to define range
  let sheetLR = sheet.getLastRow(); // get the last row
  let sheetLC = sheet.getLastColumn(); // get the last column
  let dataSR = 2; // the first row of data

  // define the data range
  let sourceRange = sheet.getRange(2, 1, sheetLR - dataSR + 1, sheetLC);

  // get the data
  let sourceData = sourceRange.getValues();

  // get the number of length of the object in order to establish a loop value
  let sourceLen = sourceData.length;

  // Loop through the rows
  for (let i = 0; i < sourceLen; i++) {
    if (sourceData[i][1] !== "") {
      let data = {};

      data.order = sourceData[i][0];
      data.name = sourceData[i][1];
      data.description = sourceData[i][2];

      firestore.createDocument(`categories/${data.name.toLowerCase()}`, data);
    }
  }
}

function getItems() {
  // Initialization
  const email = "client_email";
  const key = "private_key";
  const projectId = "project_id";
  let firestore = FirestoreApp.getFirestore(email, key, projectId);

  // get document data from ther spreadsheet
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheetName = "Items";
  let sheet = spreadsheet.getSheetByName(sheetName);

  // get the last row and column in order to define range
  let sheetLR = sheet.getLastRow(); // get the last row
  let sheetLC = sheet.getLastColumn(); // get the last column
  let dataSR = 2; // the first row of data

  // define the data range
  let sourceRange = sheet.getRange(2, 1, sheetLR - dataSR + 1, sheetLC);

  // get the data
  let sourceData = sourceRange.getValues();

  // get the number of length of the object in order to establish a loop value
  let sourceLen = sourceData.length;

  // Loop through the rows
  for (let i = 0; i < sourceLen; i++) {
    if (sourceData[i][1] !== "") {
      let data = {};

      data.order = sourceData[i][0];
      data.name = sourceData[i][1];
      data.description = sourceData[i][2];
      data.price = sourceData[i][3];
      data.display = sourceData[i][4];
      data.askAvailability = sourceData[i][5];
      data.option = sourceData[i][6];
      data.category = sourceData[i][7].toLowerCase();
      data.japanese = sourceData[i][8];

      firestore.createDocument("items", data);
    }
  }
}
