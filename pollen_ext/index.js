const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { first_name, last_name, url } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "13PpXX24vbbUvxbFvjlAVFOUBifDRDFpDxGbtlNTwapc";

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[first_name, last_name, url]],
    },
  });

});

// app.listen(1337, (req, res) => console.log("running on 1337"));