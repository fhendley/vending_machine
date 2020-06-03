//imports the readline-sync library so that the users input can be read and unserstood
readline = require('readline-sync');

//Creates a new variable called products
// this creates an array of objects all with three properties; name, slot abd price
//these are the products for the vending machine
var products = [{
  name: ' Coca-Cola',
  slot: 'A1',
  price: 1.00
},
{
  name: ' Lemonade',
  slot: 'A2',
  price: 1.00
},
{
  name: ' Water',
  slot: 'A3',
  price: 0.85
},
{
  name: ' Dairy Milk Bar',
  slot: 'B1',
  price: 1
},
{
  name: ' Galaxy Bar',
  slot: 'B2',
  price: 1
},
{
  name: ' Wispa Bar',
  slot: 'B3',
  price: 1
},
{
  name: ' Cheese and Onion Crips',
  slot: 'C1',
  price: 0.95
},
{
  name: ' Salt and Vinegar Crisps',
  slot: 'C2',
  price: 0.95
},
{
  name: ' Ready Salted Crisps',
  slot: 'C3',
  price: 0.95
}];

//creates a new variable l which defines how many objects are in the array
var l = products.length;

//creates a variable called userMoney and sets the start amount to 0
var userMoney = 0;



//Creates a function called YN
//this function is called whenever the user is meant to type yes or no but doesn't
// to inform them to type either yes or no
function YN (){
  console.log ('Please answer either yes or no.');
}

//creates a new function called findProduct
//When the user enters the prduct code, this section of code finds the corresponding
//object from the array created at the start called products
// if the code the user enters corredsponds to a slot code for one of the products in the array
//then that products is returned
//if there is no products in the array that corresponds to the users entry then the user is asked to enter a valid code
//the Purchase function is then run again
function FindProduct(array, key, value) {
  for (var i = 0; i < l; i++) {
      if (array[i][key] === value) {
          return array[i];
      }

    }
    console.log('Please enter a valid code e.g. A1, A2 etc.');
    userMoney = +userMoney;
    Purchase();
}

//Creates a function called products
//creates and defines 4 new variables
//sets the start value of variable i to 0
// When this function is called it displays the slot, name and price of each item
function Products() {

  for(var i = 0; i < l; i++) {
    var name = products[i].name;
    var slot = products[i].slot;
    var price = products[i].price;
    console.log(slot, name, '£', price)
  }
}

//creates a new function called NoCredit
//if the users credit (userMoney) is £0, then the user is asked if they want to add money through the readline.question function
// the users answer is then saved in a variable called noCredit.
// if the user answers yes then the function called AddCredit is called where the user is asked how much credit they want to add
// if the users answered no to inserting credit then the viewProducts function is called
//if the user does not respond with a yes or no anser then the function YN is called to ask them to type either yes or no
// when the YN function has finished the NoCredit function is then called again and starts from the beginning so that the
//user can give a valid response
// if the users credit is over £0, then they are taken to the Credit function (this usually occurs when they have said no to ending their
// time on the vending machine and still have credit remaining after saying no to a refund)
function NoCredit() {
  if (userMoney == 0) {
    var noCredit = readline.question('You have £' + userMoney + ', would you like to insert credit?');
    if (noCredit =='yes') {
      AddCredit();
    } else if (noCredit =='no') {
      viewProducts();
    } else {
      YN();
      NoCredit ();
    }
    } else if (userMoney > 0) {
      Credit();
  }
};

//Creates a new function called AddCredit
//the users answer is saved in the variable addedCredit
//if the amount is between 0 and 100 then the userMoney is rounded to the nearest 2 decimal places so that it is in the correct
//format and is increased by the amount saved in addedCredit
//if the amount is less than 0 or more than 100 then the user is asked to enter an amount between 0 and 100
// the function NoCredit is then called again and starts from the top of the function as the user has entered an invalid response
//when the user enters a number between 0 & 100 they are told their new credit amount and then the function called Credit is called
function AddCredit(){
  var addedCredit = readline.question('How much credit would you like to add? £');
  if (addedCredit < 100 && addedCredit>0){
    addedCredit = (Math.round(addedCredit * 100) / 100);
    userMoney = +userMoney + +addedCredit;
  } else {
    console.log('Please enter an amount between £0 and £100');
    NoCredit();
  }
  console.log('Your new credit amount is: £' + userMoney);
  Credit ();
}

//creates a new function called Credit
//if the user chose to insert credit in the NoCredit function then they are shown their current credit and asked if they want to add more
//their repose is stored in the variable moreCredit
//if their reponse was yes then the function AddCredit is called where they choose how much credit they want to add
//if they type no then they are directed to the viewProducts function where the products can be displayed and asked if they want to make a purchase
// if they dont answer yes or no then the YN function is called to tell the user to choose either yes or no and then the Credit function is called again
function Credit () {
  if (userMoney >= 0) {
    var moreCredit = readline.question("You have £" + userMoney +  ". Would you like to insert more credit?");
    if (moreCredit == 'yes') {
      AddCredit();
    } else if (moreCredit =='no') {
    //  NoCredit();
      viewProducts ();
    } else {
      YN();
      Credit();
    }
  } else if (userMoney < 0) {
  NoCredit();
  }
};

//creates a new function called viewProducts
// asks the user if they would like to make a purchase using the readline.question function and saves the answer in the new variable viewP
//if the users response is yes then they are taken to the Products function which displays the products
//they are then taken to the Purchase function which allows them to make a purchase
//if they respond no then they are taken to the refund function where they can have a refund of their credit
//if they answer neither yes nor no then they are tken to the YN fucntion
//then the viewProducts function is started again
function viewProducts () {
  var viewP = readline.question('Would you like to make a purchase?');
  if (viewP == 'yes') {
    Products();
    Purchase();
  } else if (viewP == 'no') {
    Refund ();
  } else {
    YN();
    viewProducts();
  }
};

//Creates a function called Purchase
// asks the user for the code of the product they wish to purchase and their answer is stored in the variable called code
// a new variable object holds the product returned from the FindProduct function called whcih uses the users input to find the product they wish to purchase
// if the users credit is more than or equal to the objects price then the price of the product is taken off the price of the userMoney
//the user is then asked if they would like to make another purchase and if they answer yes then the Purchase function is called again
//if they answer no then then they are taken to the refund function
// if the user doesnt answer yes or no then they are taken to the YN function and then to the start of the Purchase function
//if the users credit is less than the object price then the user is told they have in sufficient funcds and taken back to the Credit function to allow them to insert Credit
function Purchase() {
  var code = readline.question('Please enter the code of the product you wish to purchase.');
  var obj = FindProduct(products, 'slot', code);
  if (userMoney >= obj.price) {
    userMoney = (+userMoney - obj.price);
    var purchase2 = readline.question('You have purchased' + obj.name + '. You now have £' + userMoney + '. Would you like to make another purchase?');
    if (purchase2 == 'yes'){
      Purchase ();
    } else if (purchase2 == 'no') {
      Refund ();
    } else {
      YN();
      Purchase();
    }
  } else if (userMoney < obj.price) {
    console.log('Sorry, you have insufficient funds.');
    Credit();
  }
};


//creates a new function refund
// asks the user if they would like their remaning credit back if they have any credit left
//if the users input is yes then it returns the money and sets the userMoney to 0 and then runds the function End
// if the users input is no then the function End is called
//if the users input is something else then the YN function is called and then the current function is called again
// if the user has no credit remaining then they are taken to the End function
function Refund (){
  if (userMoney > 0) {
    var refund = readline.question('Would you like a refund of your remaining credit?');
    if (refund == 'yes'){
      console.log('Here is your £' + userMoney);
      userMoney = +userMoney - +userMoney;
      End ();
    } else if (refund == 'no'){
      End();
    } else {
      YN ();
      Refund();
    }
  } else {
    End();
  }
}

//creates a new function End
//asks the user if they would like to end their purchase on the vending machine and their answer is stored in the variable called end
//if the user answers yes then the machine says bye and the code reaches an end
// if they say no then they are taken back to the NoCredit function where they can continue making a purchase
//if they answer neither yes nor no then they are taken to the YN function and then back to the start of the End function
function End() {
  var end = readline.question ('Would you like to end your purchase on this vending machine?');
  if (end == 'yes'){
    console.log('Thanks for using this vending machine, bye!');
    process.exit();
  } else if (end == 'no'){
    NoCredit();
  }else {
    YN ();
    End ();
  }
}

//reads the function called 'NoCredit' which starts the vending machine code
//depending on the users input, different functions in the code are called at different times.
NoCredit ();
