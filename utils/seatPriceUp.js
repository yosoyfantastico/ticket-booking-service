require('dotenv').config();
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
                const parsedData = parseCSVData(results);
                resolve(parsedData);
            })
            .on('error', (error) => reject(error));
    });
}

function parseCSVData(csvData) {
    const result = [];

    for (const row of csvData) {
        const parsedRow = {
            id: row.id,
            seat_class: row.seat_class,
            min_price: parseNumericValue(row.min_price),
            normal_price: parseNumericValue(row.normal_price),
            max_price: parseNumericValue(row.max_price),
        };

        result.push(parsedRow);
    }

    return result;
}

function parseNumericValue(value) {
    if (typeof value === 'string') {
        const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
        return isNaN(numericValue) ? null : numericValue;
    }

    return null;
}

async function insertDataIntoDatabase(data) {
    const client = await pool.connect();
    try {
        for (const row of data) {
            const query = {
                text: 'INSERT INTO SEATS_PRICE (id, seat_class, min_price, normal_price, max_price) VALUES ($1, $2, $3, $4, $5)',
                values: [row.id, row.seat_class, row.min_price, row.normal_price, row.max_price],
            };

            await client.query(query);
        }
        console.log('Data success.');
    } catch (error) {
        console.error('Error ', error);
    } finally {
        client.release();
    }
}

const filePath = 'utils/seatPrice.csv';

readCSVFile(filePath)
    .then((data) => {
        insertDataIntoDatabase(data);
    })
    .catch((error) => {
        console.error('Error :', error);
    });