require('dotenv').config()
const fs = require('fs');

const csv = require('csv-parser');
const pool = require('../services/dbConfig');


function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => reject(error));
  });
}

async function insertDataIntoDatabase(data) {
  const client = await pool.connect();
  try {
    for (const row of data) {
      const query = {
        text: 'INSERT INTO SEATS (id, seat_identifier, seat_class) VALUES ($1, $2, $3)',
        values: [row.id, row.seat_identifier, row.seat_class],
      };

      await client.query(query);
    }
    console.log('Data ok.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
  }
}

const filePath = 'utils/seats.csv';

readCSVFile(filePath)
  .then((data) => {
    insertDataIntoDatabase(data);
  })
  .catch((error) => {
    console.error('Error reading CSV file:', error);
  });