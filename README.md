# Samuel's Automated Mail Merge System (SAMMS)

This project is an **automated mail merge system** built with **Google Apps Script** that works directly with **Google Sheets**.  
It allows you to send personalized emails using spreadsheet data and a Gmail draft as an email template.

The project consists of two files:
- `code.gs` – the main Google Apps Script logic
- `DraftDialogs.html` – the HTML file used for the UI dialog inside Google Sheets

---

## Features

- Send personalized emails using data from Google Sheets
- Uses Gmail drafts as email templates
- Simple UI dialog inside Google Sheets
- No external dependencies
- Runs entirely on Google Apps Script

---

## Requirements

- A Google account
- Google Sheets
- Access to Gmail
- Basic familiarity with Google Apps Script

---

## File Overview

### `code.gs`
The main script file that:
- Adds a custom menu to Google Sheets
- Reads data from the active spreadsheet
- Retrieves a Gmail draft
- Replaces placeholders with row data
- Sends emails automatically

### `DraftDialogs.html`
Defines the HTML UI displayed inside Google Sheets.  
This dialog is used to interact with the mail merge process (for example, selecting a draft and starting the merge).

---

## Setup Instructions

### 1. Create a Google Sheet
Create a new Google Sheet (or open an existing one) containing the data you want to use for the mail merge.

Example column headers:
- `Email`
- `FirstName`
- `LastName`
- Any other custom fields you want to use in the email

---

### 2. Open Google Apps Script
1. In the Google Sheet, go to  
   **Extensions → Apps Script**
2. Delete any default code.

---

### 3. Add the Project Files

#### Add `code.gs`
- Create a script file named `code.gs`
- Copy and paste the contents of `code.gs` from this repository

#### Add `DraftDialogs.html`
- Click **+ → HTML**
- Name the file `DraftDialogs`
- Copy and paste the contents of `DraftDialogs.html` from this repository

---

### 4. Save and Reload
- Save the Apps Script project
- Reload the Google Sheet

After reloading, a **custom menu** defined in `code.gs` should appear in the spreadsheet.

---

## Preparing the Gmail Draft

1. Open Gmail
2. Create a new email draft
3. Use placeholders that match the column headers in your Google Sheet

Example:


The placeholder names must exactly match the column headers.

---

## Using the Mail Merge Tool

1. Open the Google Sheet
2. Click the custom menu added by the script
3. Open the mail merge dialog
4. Select the Gmail draft
5. Run the mail merge

The script will:
- Process each row in the spreadsheet
- Replace placeholders with the corresponding row values
- Send personalized emails automatically

---

## Permissions

The first time the script runs, Google will request authorization to:
- Read and modify Google Sheets
- Access Gmail (to read drafts and send emails)

These permissions are required for the tool to function.

---

## Notes & Limitations

- Gmail daily sending limits apply (based on account type)
- Always test with a small dataset before sending to a full list
- Ensure email addresses are valid to avoid errors

---
