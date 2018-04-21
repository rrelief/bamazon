//First I need to set up the npm package requirements for my node app
var mysql = require ("mysql");
var inquirer = require("inquirer");
var table = require("cli-table"); //will show clean data in table format in console (found online)

//Now, I have to establish my connection to mysql
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,

    //your username
    user:"root",

    //your password
    password: "Newmoney00$",
    database: "bamazon_db"
});


//Make sure I'm connected to the database
connection.connect(function(err){
    if(err) {
        throw err;
    }
    console.log("You're Connected to Bamazon database, Boss!");

    //function that pulls data in database and displays to the user
    connection.query("SELECT * FROM products", function(err, response){
        if (err) {
            throw err;
        }
        //Get fancy, create a table variable and console log the data in table format
        var productTable = new table({
            //declare the value categories for table
            head: ['Unique ID','Product Name','Dept. Name','Price $', 'Quantity'],
            // set width to scale
            colWidths: [15,50,20,10,15]
        });
        // need to create a for-loop to loop through each row of database
        for (i = 0; i < response.length; i++) {
            //push data to the table
            productTable.push(
                [response[i].unique_id, response[i].product_name, response[i].department_name, response[i].price,response[i].stock_quantity]
            );
        }
        console.log(productTable.toString());
        purchase();
    });
});

//Need to create a function that allows users to purchase item and reduce quantity

function purchase () {
    //user inputs unique id and quantity they want to purchase. Then deduct transaction from database
    inquirer.prompt([
        {
            name:"ID",
            type: "input",
            message: "What's the Unique ID for the product you wish to purchase?"
        },
        {
            name:"Quantity",
            type:"input",
            message:"How many would you like to purchase?"
        },
        //set the captured inputs from users as variables
    ]).then(function(answers){
        var quantityPurchased = answers.Quantity;
        var IDpurchased = answers.ID;
        purchaseFromDatabase(IDpurchased, quantityPurchased);
    });
} 

//need to create a function that reduces the database by the users purchase amount
function purchaseFromDatabase(IDpurchased,quantityPurchased) {
    //check to see if the quantity is in stock, if not log the error
    connection.query('SELECT * FROM products WHERE unique_id = ' + IDpurchased, function(error,response) {
        if (error) {console.log(error);}

        // if in stock
        if (quantityPurchased <= response[0].stock_quantity) {
            var totalCost = response[0].price * quantityPurchased;
            console.log("Bamazon has exactly what you need. Your total is " + totalCost);
            
            //update the database for the sale
            connection.query('UPDATE products set stock_quantity = stock_quantity -' + quantityPurchased + 'WHERE unique_id = ' + IDpurchased);
        }
        else {
            console.log("Sorry, we don't have enough of that item is stock to fulfill your order!");
        }
        displayALL();
    });
}

function displayALL() {
    connection.query("SELECT * FROM products", function(err, response){
        if (err) {
            throw err;
        }
        var productTable = new table({
            head: ['Unique ID','Product Name','Dept. Name','Price $', 'Quantity'],
            colWidths: [15,50,20,10,15]
        });
        for (i = 0; i < response.length; i++) {
            productTable.push(
                [response[i].unique_id, response[i].product_name, response[i].department_name, response[i].price,response[i].stock_quantity]
            );
        }
        console.log(productTable.toString());
});
}


// Naughty Boi Productions 
