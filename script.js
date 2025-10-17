$(document).ready(function() {
       // Path to the CSV file
       const csvFilePath = 'data.csv';

       // Function to parse CSV file
       function parseCSV(text) {
           const lines = text.split('\n');
           const result = [];
           for (let i = 1; i < lines.length; i++) {
               const line = lines[i].trim();
               if (line) {
                   const [date, product, amount] = line.split(',');
                   result.push({ date, product, amount: parseFloat(amount) });
               }
           }
           return result;
       }

       // Fetch and display CSV data
       $.get(csvFilePath, function(data) {
           const salesData = parseCSV(data);
           let totalSales = 0;

           salesData.forEach(item => {
               totalSales += item.amount;
               const row = `<tr>
                               <td>${item.date}</td>
                               <td>${item.product}</td>
                               <td>$${item.amount.toFixed(2)}</td>
                            </tr>`;
               $('#sales-table tbody').append(row);
           });

           $('#total-sales').text(totalSales.toFixed(2));
       });
   });