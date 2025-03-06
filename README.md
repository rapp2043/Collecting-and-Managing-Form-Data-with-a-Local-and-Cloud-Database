# Collecting-and-Managing-Form-Data-with-a-Local-and-Cloud-Database
This project demonstrates how to effectively collect and manage form data by connecting a Google Form to a database, storing the data both locally (on MySQL Workbench) and in a cloud environment (freesqldatabase.com). This approach ensures that data is accessible, manageable, and synchronized without incurring hosting costs.

![test drawio (2)](https://github.com/user-attachments/assets/b1d03be9-b75f-4c2c-8a12-940eda89a068)

## Project Overview
This project demonstrates how I effectively (and inexpensively) collected and managed form data by connecting a Google Form to a database, storing the data both locally (on MySQL Workbench) and in a cloud environment (freesqldatabase.com/Google Forms). This approach ensures that data is accessible, manageable, and synchronized without incurring hosting costs.

### Scenario
A local nonprofit organization is planning a series of community workshops and needs a simple, cost-effective way to collect and manage participant registrations. They want to avoid expensive hosting solutions and need a system that allows them to store and access registration data both locally and in the cloud.

## Features
## Scenario: **Community Event Registration System**  

A local nonprofit organization is planning a series of community workshops and needs a simple, cost-effective way to collect and manage participant registrations. They want to avoid expensive hosting solutions and need a system that allows them to store and access registration data both locally and in the cloud.

### **How This Project Helps:**  
1. **Google Forms for Easy Registration**  
   - Attendees sign up using a simple Google Form, reducing friction in the registration process.  

2. **Google Sheets for Automatic Data Collection**  
   - Form responses are automatically stored in a Google Sheet for easy tracking and review.  

3. **Cloud Database for Centralized Access**  
   - A MySQL database hosted on **freesqldatabase.com** ensures that organizers can securely access the registration data from any location.  

4. **Local MySQL Workbench for Backup and Management**  
   - A local copy of the database allows administrators to perform in-depth data analysis and maintain an offline backup.  

5. **phpMyAdmin for Web Access**  
   - Organizers can log in via phpMyAdmin to quickly view, update, or export participant data without needing additional software.  

### **Outcome:**  
With this system in place, the nonprofit can efficiently manage registrations, analyze participant demographics, and streamline event planning—all without the need for expensive infrastructure or paid database hosting.

## Technologies Used
- Google Forms
- Google Sheets
- MySQL Workbench
- freesqldatabase.com (Free MySQL Hosting)
- phpMyAdmin

## Step-by-Step Implementation

### 1. Setting Up the Cloud Database
1. Registered an account on [freesqldatabase.com](https://www.freesqldatabase.com/).
2. Created a new database instance leveraging the provided credentials, which included:
   - **Database Name**
   - **Username**
   - **Password**
   - **Hostname**
   - **Port**
3. Opened **MySQL Workbench** and created a new connection using the provided credentials:
   ```plaintext
   Hostname: my_freesqldatabase_hostname
   Username: my_freesqldatabase_username
   Password: my_freesqldatabase_password
   Port: my_freesqldatabase_port
   ```
4. Tested the connection and ensured it connected successfully.

### 2. Creating the Database Framework in MySQL Workbench
1. Opened **MySQL Workbench** and created a new schema (database).
2. Created a single table that aligned with the form structure:
   ```sql
   CREATE TABLE form_responses (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       message TEXT,
       submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
3. Executed the script to create the table structure.

### 3. Connecting Google Forms to Google Sheets
1. Created a Google Form with the same fields as the database:
   - **Name**
   - **Email**
   - **Message**
2. Clicked on **Responses** → **Link to Sheets** to create a Google Sheets file that automatically stores form responses.

### 4. Syncing Google Sheets with MySQL Cloud Database
1. Opened Google Sheets and went to **Extensions** → **Apps Script**.
2. Added the following script to sync data with the MySQL cloud/local database:
   
```javascript
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
   ```

3. Saved and ran the script as a trigger to send data to the MySQL database.
![image](https://github.com/user-attachments/assets/3438e8f6-5b19-4d89-8fb7-8b5e84d51026)

### 5. Tested Form Receipt
1. Executed a test run of the form to ensure the Google Sheet and database were receiving the data
![image](https://github.com/user-attachments/assets/00d2a0ba-d009-4391-9250-dccf80921728)

![image](https://github.com/user-attachments/assets/74bd1d08-17ce-4ef9-a1c5-f340e43b91d7)


### 6. Accessing the Data via phpMyAdmin
1. Logged into **phpMyAdmin** on freesqldatabase.com.
2. Navigated to the database and verified that form responses are being stored.
![image](https://github.com/user-attachments/assets/2e1d4e97-66a9-43c7-9429-6569b0d51822)

3. Verified on MySQL Workbench that database values are being stored.
![image](https://github.com/user-attachments/assets/64042ffe-b025-4570-aa59-35068eab99c5)


## Repository Contents
- `README.md` – Documentation for the project.
- `schema.sql` – SQL script for creating the database structure.
- `sync_google_sheets.js` – Google Apps Script for syncing data to the MySQL database.

## Future Enhancements
- Automate the data sync process via Google Sheets Triggers.
- Build a simple web interface for managing responses.
- Enhance security by encrypting sensitive data.

## How to Use
1. Clone the repository:

   ```plaintext
   git clone https://github.com/yourusername/your-repo.git
   ```
2. Follow the setup instructions to configure your cloud database and Google Forms integration.
3. Run the provided scripts to sync and manage data.

## License
This project is open-source and licensed under the MIT License.

## Contributing
If you'd like to contribute, feel free to submit a pull request or open an issue for discussion!


