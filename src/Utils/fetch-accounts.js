import config from "./config";
/**
 * Load the data from the spreadsheet
 * Get the right values from it and assign.
 */
export const onLoad = (cb) => {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:G"
      })
      .then(
        response => {
          const data = response.result.values;
          const accounts = data.map(account => ({
            name: account[0],
            location: account[1],
            public: account[2],
            author: account[3],
            type: account[4],
            tags: account[5]
          })) || [];
          cb({
            accounts
          });
        },
        response => {
          cb(false, response.result.err);
        }
      );
  });
}