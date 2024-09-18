"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Nantha Kumar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2024-07-12T10:51:36.790Z",
    "2024-07-11T23:36:17.929Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-05-27T17:01:17.194Z",
    "2024-06-29T21:31:17.178Z",
    "2024-06-30T21:31:17.178Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Hari Haran",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-05-27T17:01:17.194Z",
    "2024-07-11T23:36:17.929Z",
    "2024-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Mani Shankar",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-05-27T17:01:17.194Z",
    "2024-07-11T23:36:17.929Z",
    "2024-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Shri Nithi",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-05-27T17:01:17.194Z",
    "2024-07-11T23:36:17.929Z",
    "2024-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// creating the short form username for the all owners and creating a element in the accounts object and storing that values for each iteraton

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

// date for movements
const formatMovementDate = function (date) {
  // days passed function
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  // current date -movement date
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hour = date.getHours();
    // const min = date.getMinutes();
    // return `${day}/${month}/${year}`;

    // for doing this instead we can use the internationalisation concept

    return new Intl.DateTimeFormat("ta-IN").format(date);
  }
};

// formating the currencies
const formatCurrency = function (value) {
  return new Intl.NumberFormat("ta-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

// adding movements to the html page
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = " "; //to delete already present movements

  // sorting
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; //if the sort value is true then sorting performed otherwise return the original movememnts value to movs

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // formating the movements according with currency using the internationalization
    const formatedMov = formatCurrency(mov);

    // date for every movements
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date);

    const html = ` 
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>

        
      <div class="movements__value">${formatedMov}</div>
    </div>`;
    // inserting the hmtl content to  the page
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// calculating the balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(acc.balance);
};

// displaying the tatal in and out and interest summary
const displayBalanaceSummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes);

  const outcomes = Math.abs(
    acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );
  labelSumOut.textContent = formatCurrency(outcomes);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1) //taking the interest values that are only greater than 1
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(interest);
};

// updating ui
const updateUI = function (currentAcc) {
  // display account movements
  displayMovements(currentAcc);

  // /display account balance
  calcDisplayBalance(currentAcc);

  // display account balance summary
  displayBalanaceSummary(currentAcc);
};

// IMPLEMENTING LOG IN USING EVENT HANDLERS
let currentAccount, timer;

// implementing the timer to logout functionality
const setLogoutTimer = function () {
  // set time to 5 mins
  let time = 120;

  //  creating the functionality of the timer
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0); // on dividing the total seconds with 60 we get the min
    const sec = String(time % 60).padStart(2, 0); // seconds will be remainder on dividing time by 60
    // each time print the time left to the ui
    labelTimer.textContent = `${min}:${sec}`;

    // when reached 0 seconds stop the timer and log out the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // decrease 1 second
    time--;
  };

  // call the timer every second
  tick(); //here we are calling immediately to avoid the wrong countdown starting
  const timer = setInterval(tick, 1000);
  return timer; //here we returning timer bcoz so that if there any timer already running we can stop it
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); //preventing the default submit action
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //here using optional chaining ? bcoz pin is validated only the current account exists
    // display ui and messages
    if (timer) clearInterval(timer); //if there is already one timer running for one account and when we login to another account it will collapse with new timer so we need to cancel timer if already exists
    timer = setLogoutTimer(); // starting the timer once immediately the user logged in
    updateUI(currentAccount); //updating ui

    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //  current date displaying
    const now = new Date();
    const dateObjects = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long", // returns a month name ex-august
      year: "numeric",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      "en-US",
      dateObjects
    ).format(now); // formating the date using the internationalization

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    // taking focus off from the field
    inputLoginPin.blur();
  }
});

// implementing transfers
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    recieverAccount &&
    amount <= currentAccount.balance &&
    recieverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    // adding the transcation date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());

    //update ui
    updateUI(currentAccount);

    // reset the timer
    clearInterval(timer); //here we cancel the timer if any transaction done
    timer = setLogoutTimer(); // again restarting the timer
  }
  // empty the to and amoubt field
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
});

// implementing the close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // removing the account from the accounts objects
    accounts.splice(index, 1);

    // hiding the ui
    containerApp.style.opacity = 0;
  }
  // clearing the input fields
  inputCloseUsername.value = inputClosePin.value = "";
});

// getting loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1) // the loan amount should be greater than 10% of any deposits
  ) {
    // implementing the settimeout function so that loan will be approved only after some seconds
    setTimeout(function () {
      //add movements
      currentAccount.movements.push(amount);
      // adding loan date
      currentAccount.movementsDates.push(new Date().toISOString()); //this toisostring will convert the date in neat sring format and it is not madantory

      //update ui
      updateUI(currentAccount);

      // reset the timer
      clearInterval(timer); //here we cancel the timer if any transaction done
      timer = setLogoutTimer(); // again restarting the timer
    }, 2500);
    inputLoanAmount.value = "";
  }
});

// impelementing the sorting by calling the displaymovements with sort parameter true
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);


console.log(accounts);

//filtering the deposit using the filter function
accounts.forEach(function (acc) {
  const deposits = acc.movements.filter(function (mov) {
    return mov > 0; //this returns boolean value and if the return value is true then the current iteration is added to the filter array
  });
  console.log(deposits);
});

*/

// parsing
console.log(parseInt("30px"));
console.log(parseFloat("2.5 rajesh##$%^"));
console.log(parseInt("@123")); //this  will return NaN bcoz the string should only start with numbers for parsing

labelBalance.addEventListener("click", function () {
  console.log([...document.querySelectorAll(".movements__row")]);
});
/////////////////////////////////////////////

// days
const daysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
const dif = daysPassed(new Date(2024, 3, 14), new Date(2024, 3, 24));
console.log(dif); // output:10

// Internalization
const nowdate = new Date();
const dateObjects = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long", // returns a month name ex-august
  year: "numeric",
};
const formated = new Intl.DateTimeFormat("en-US", dateObjects).format(nowdate);
console.log(formated); // 7/1/2024  month/date/year

// creating a sample clock
const newdate = new Date();
const objects = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

console.log(new Intl.DateTimeFormat("ta-IN", objects).format(newdate));
