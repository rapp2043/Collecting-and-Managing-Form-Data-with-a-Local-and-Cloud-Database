function submitToMySQL(e) {
  // Database connection details
  var connectionName = 'sql5.freesqldatabase.com'; // If you're not using this, replace with your actual MySQL host
  var dbName = 'my_dbName';
  var user = 'my_username';
  var password = 'my_password';

  var url = 'jdbc:mysql://' + connectionName + '/' + dbName;
  
  try {
    var conn = Jdbc.getConnection(url, user, password);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    
    // Read last row data
    var name = sheet.getRange(lastRow, 1).getValue();
    var email = sheet.getRange(lastRow, 2).getValue();
    var message = sheet.getRange(lastRow, 3).getValue();

    // Insert data into MySQL table
    var stmt = conn.prepareStatement(
      'INSERT INTO form_responses (name, email, message) VALUES (?, ?, ?)'
    );
    stmt.setString(1, name);
    stmt.setString(2, email);
    stmt.setString(3, message);
    
    stmt.execute();
    stmt.close();
    conn.close();
    
    Logger.log('Data successfully inserted into MySQL!');
  } catch (err) {
    Logger.log('Error: ' + err.message);
  }
}
