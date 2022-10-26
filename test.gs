// **************** Add menu **************************//
function onOpen() {
  var menu = SpreadsheetApp.getUi().createMenu('InterACT DataLoader')  .addItem('SignIn', 'siginForm')
   menu.addToUi();
}
// **************** Open InterACTDataLoader SignIn UI **************************//
function siginForm(){
  var html = HtmlService.createHtmlOutputFromFile('SignIn').setTitle('InterACT DataLoader');
  SpreadsheetApp.getUi().showSidebar(html);
}
function getAuthUrl(authUrl) {
   Logger.log("authUrl"+authUrl);
   //userProperties.setProperty('authUrl',authUrl);
   var html = HtmlService.createHtmlOutputFromFile('EnterCredentials').setTitle('InterACT DataLoader');
   SpreadsheetApp.getUi().showSidebar(html);
}
function getAccessToken(username,password,securitytoken,consumerkey,consumersecret) {
  var authURL = userProperties.getProperty('authUrl')+"/services/oauth2/token";
  var payload = {
    'grant_type'      :'password',
    'client_id'       : consumerkey,                                        
    'client_secret'   : consumersecret,
    'username'        : username,
    'password'        : password + securitytoken        
   }; 
  var options = {
    'method'          : 'post',
    'payload'         : payload
  };
  var results = UrlFetchApp.fetch(authURL, options);
  Logger.log("results = " + results);
  var json = results.getContentText();
  var data = JSON.parse(json);
   var ss= SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("Sheet1");
  mainSheet.appendRow([data.access_token,data.instance_url]);
  userProperties.setProperty('accesstoken',data.access_token);
   userProperties.setProperty('instanceUrl',data.instance_url);
  // if(data.access_token){
  //  var html = HtmlService.createHtmlOutputFromFile('SuccessPage')
  //     .setTitle('InterACT DataLoader');
  //  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
  //     .showSidebar(html);
  // }
}
