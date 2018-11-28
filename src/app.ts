const props = PropertiesService.getScriptProperties();
const sheetKey = props.getProperty('SHEET_KEY');

declare var global: any;

global.doGet = () => {
  return HtmlService.createTemplateFromFile('feed-list').evaluate();
};

function getFeedInfo() {
  if (!sheetKey) {
    throw new Error('fail to open');
  }
  const ss = SpreadsheetApp.openById(sheetKey);
  const sheets = ss.getSheets();
  return sheets.map(sheet => {
    const [url, _, date] = sheet.getRange(1, 1, 1, 3).getValues()[0];
    const name = sheet.getName();
    return { name, url, date };
  });
}
