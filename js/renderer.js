const { ipcRenderer } = require('electron');
const fs = require('fs');

let dataToSave = []; // Store data to be saved/exported

// Event listener for the "Proceed" button
document.getElementById('proceedButton').addEventListener('click', () => {
  // Get the user-entered website link
  const websiteLink = document.getElementById('websiteLink').value;

  // Hide both the 'popup' and 'popup-3'
  const popup = document.getElementById('popup');
  const popup3 = document.getElementById('popup-3');
  popup.style.display = 'none'; // Hide 'popup'
  popup3.style.display = 'none'; // Hide 'popup-3'

  // Check if the website link is not empty
  if (websiteLink.trim() !== '') {
    // Send the website link to the main process to initiate scraping
    ipcRenderer.send('scrape-website', { websiteLink });
  } else {
    // Handle empty input or provide user feedback
    console.error('Website link is empty.');
  }
});

ipcRenderer.on('scraping-result-website', (event, result) => {
  try {
    // No need to parse the result as it's already an object
    const data = result;

    // Check for the result and populate the table with the scraped data
    if (Array.isArray(data)) {
      const scrapingResultsElement = document.getElementById('scraping-results');
      // Clear the existing table content
      scrapingResultsElement.innerHTML = '';

      // Store data to be saved/exported
      dataToSave = data;

      // Iterate over the scraping results and append them as new rows to the table
      data.forEach((row) => {
        const newRow = scrapingResultsElement.insertRow();
        newRow.insertCell(0).textContent = row['Name'];
        newRow.insertCell(1).textContent = row['Email Address'];
        newRow.insertCell(2).textContent = row['Source'];
        newRow.insertCell(3).textContent = row['Keyword'];
        newRow.insertCell(4).textContent = row['Title'];
        newRow.insertCell(5).textContent = row['Domain'];
        newRow.insertCell(6).textContent = row['Meta Description'];
        // You can continue to add more cells for other data as needed
      });
    } else {
      console.error('Scraping result is not an array:', data);
    }
  } catch (error) {
    console.error('Error parsing scraping result:', error);
  }
});

// Event listener for the "Email Verifier" status
document.querySelector('.status-type-email').addEventListener('click', () => {
  const table = document.getElementById('emailTable');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const emailCell = row.cells[1].textContent; // Assuming the email address is in the second cell (index 1)

    // Validate the email address (you need to implement this validation logic)
    const isValid = validateEmail(emailCell);

    if (!isValid) {
      // Remove the row if the email address is not valid
      table.deleteRow(i);
      i--; // Decrement the counter since the rows shifted up
    }
  }
});

// Function to validate an email address (you should implement your validation logic here)
function validateEmail(email) {
  // Implement your email validation logic here and return true for valid emails, false for invalid ones
  // For a basic example, you can use a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Event listener for the "Save" status
document.getElementById('save').addEventListener('click', () => {
  const table = document.getElementById('emailTable');
  const rows = table.getElementsByTagName('tr');
  const dataToSave = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.cells;

    // Extract data from the table cells
    const rowData = {
      Name: cells[0].textContent,
      EmailAddress: cells[1].textContent,
      Source: cells[2].textContent,
      Keyword: cells[3].textContent,
      Title: cells[4].textContent,
      Domain: cells[5].textContent,
      MetaDescription: cells[6].textContent,
    };

    dataToSave.push(rowData);
  }

  // Send an IPC message to the main process to open the save dialog
  ipcRenderer.send('open-save-dialog', dataToSave);
});

// Event listener for the "Refresh" status
document.getElementById('refresh').addEventListener('click', () => {
  // Reload or refresh the page
  location.reload();
});


// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
  // Get the user-entered keyword and location
  const keyword = document.getElementById('keyword').value;
  const location = document.getElementById('location').value;

  // Send the search parameters to the main process to initiate search engine scraping
  ipcRenderer.send('scrape-search', { keyword, location });
});

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
  // Get the user-entered keyword and location
  const keyword = document.getElementById('keyword').value;
  const location = document.getElementById('location').value;

  // Send the search parameters to the main process to initiate search engine scraping
  ipcRenderer.send('scrape-search', { keyword, location });
});