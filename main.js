const { dialog, app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('scrape-website', (event, { websiteLink }) => {
    // Spawn the PHP script as a child process
    const phpScriptPath = path.join(__dirname, 'scraper.php');
    const phpScript = spawn('php', [phpScriptPath, websiteLink]);

    // Capture the output of the PHP script
    let phpOutput = '';

    phpScript.stdout.on('data', (data) => {
        phpOutput += data.toString();
    });

    phpScript.stderr.on('data', (data) => {
        console.error('PHP Script Error:', data.toString());
    });

    phpScript.on('close', (code) => {
        if (code === 0) {
            // PHP script executed successfully
            const scrapingResult = JSON.parse(phpOutput);
            event.reply('scraping-result-website', scrapingResult);
        } else {
            // Handle errors
            event.reply('scraping-error', 'PHP script encountered an error');
        }
    });
});


// Event handler to open the Save dialog
ipcMain.on('open-save-dialog', (event, dataToSave) => {
  const win = BrowserWindow.getFocusedWindow();

  dialog
    .showSaveDialog(win, {
      defaultPath: 'email_data.csv', // Default file name
      filters: [
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'Text Files', extensions: ['txt'] },
      ],
    })
    .then((result) => {
      if (!result.canceled) {
        const fileExtension = result.filePath.split('.').pop().toLowerCase();
        const dataToWrite = dataToSave.map((row) => Object.values(row).join(', ')).join('\n');

        fs.writeFile(result.filePath, dataToWrite, (err) => {
          if (err) {
            console.error('Error saving the file:', err);
          } else {
            console.log('File saved successfully.');
          }
        });
      }
    })
    .catch((err) => {
      console.error('Error opening save dialog:', err);
    });
});


// Event handler to initiate search engine scraping

ipcMain.on('scrape-search', (event, { keyword, location }) => {
  const phpScript = spawn('C:\\xampp\\php\\php.exe', ['search-scraper.php', keyword, location]);

  let phpOutput = '';

  phpScript.stdout.on('data', (data) => {
      phpOutput += data.toString();
  });

  phpScript.stderr.on('data', (data) => {
      console.error('Search Engine Scraping Error:', data.toString());
      event.reply('scraping-error', 'Search engine script encountered an error');
  });

  phpScript.on('close', (code) => {
      if (code === 0) {
          // PHP script executed successfully
          event.reply('scraping-result-search', phpOutput);
      } else {
          // Handle errors
          event.reply('scraping-error', 'Search engine script encountered an error');
      }
  });
});
