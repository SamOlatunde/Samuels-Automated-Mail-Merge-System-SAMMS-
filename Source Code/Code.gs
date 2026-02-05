
function onOpen(e) {
    
   var ui = SpreadsheetApp.getUi()
      ui.createMenu('SAMMS')
          .addItem('Start Mail Merge', 'showPrompt')
          
          
          .addToUi();

 
}




function showPrompt() {
  var html = HtmlService.createHtmlOutputFromFile('DraftDialogs')
      .setWidth(400)
      .setHeight(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'Start Mail Merge');
}

function getDraftDetails() {
  
  
  const dateOptions = {
    weekday:'short',
    year:'numeric',
    month:'short',
    day :'2-digit'
  }

  const drafts = GmailApp.getDrafts();  // Get all Gmail drafts
  
  
  var allDrafts = [];

  for (let i = 0; i < drafts.length; i++) {
    const message = drafts[i].getMessage();
     
    allDrafts.push ( {
      subject: message.getSubject(),
      date: message.getDate().toLocaleDateString(undefined,dateOptions),
      id: message.getId() 
   }); 
   Logger.log(allDrafts[i].subject + " (" + allDrafts[i].date + ") ");
  }

  return allDrafts;  // Optional: return the array for further use
}



// gets the intended mail by the user, replaces placeholders, and sends mail to all recipients
function parse_Send(messageId) {
  // gets active sheet and last row and col in sheet. Indexing starts at one 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const lastRow = sheet.getLastRow();
  Logger.log(lastCol);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  let message = GmailApp.getMessageById(messageId);
  let messageSubject = message.getSubject();
  let messageBody = message.getPlainBody();
  let attachments = message.getAttachments();
  let options = {attachments: attachments};

  /*let cc = 'spliffbenny@gmail.com';  // for bcc/cc testing 
  let options = {attachments: attachments, cc:cc};*/

  // logic to replace the body
  for (let i = 0; i < data.length; i++) {
    let newMessageBody = messageBody; // start fresh for each person
    let newMessageSubject = messageSubject;

    for (let j = 0; j < headers.length; j++) {
      let regex = new RegExp(`{{${headers[j]}}}`, 'g');
      newMessageSubject = newMessageSubject.replace(regex, data[i][j]);
      newMessageBody = newMessageBody.replace(regex, data[i][j]);
    }
    
    // send email to the address in first column
    GmailApp.sendEmail(data[i][0], newMessageSubject, newMessageBody,options);
  }
}
