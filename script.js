let birthDate = document.querySelector('#Bday');
let msg = document.querySelector('.output');
let gif = document.querySelector('.watch');

//function to reverse string
function reverseString(str) {
    return str.split("").reverse().join("");
}

//function to check palindrome
function palindromeCheck(str) {
    let reverseStr = reverseString(str);
    if (str === reverseStr) {
        return true;
    }
    return false;
}

//function to convert date from number to string
function convertDateToString(selectedDt) {
    let convertedDt = { day: "", month: "", year: "" };

    if (selectedDt.day < 10) {
        convertedDt.day = "0" + selectedDt.day;
    } else {
        convertedDt.day = (selectedDt.day).toString();
    }

    if (selectedDt.month < 10) {
        convertedDt.month = "0" + selectedDt.month;
    } else {
        convertedDt.month = (selectedDt.month).toString();
    }

    convertedDt.year = (selectedDt.year).toString();

    return convertedDt;

}

//function to get all date formats
function allDateVariation(selectedDt) {
    let ddmmyyyy = selectedDt.day + selectedDt.month + selectedDt.year;
    let mmddyyyy = selectedDt.month + selectedDt.day + selectedDt.year;
    let yyyymmdd = selectedDt.year + selectedDt.month + selectedDt.day;
    let ddmmyy = selectedDt.day + selectedDt.month + selectedDt.year.slice(-2);
    let mmddyy = selectedDt.month + selectedDt.day + selectedDt.year.slice(-2);
    let yymmdd = selectedDt.year.slice(-2) + selectedDt.month + selectedDt.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//function to check palindrome for all date formats
function palindromeCheckForAllFormats(selectedDt) {
    let dateStr = convertDateToString(selectedDt);
    let allDateFormats = allDateVariation(dateStr);
    let palindromeList = [];

    for (let i = 0; i < allDateFormats.length; i++) {
        let result = palindromeCheck(allDateFormats[i]);
        palindromeList.push(result);
    }
    return palindromeList;

}

//function to check leap year
function isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;

    return false;
}

//function to get next day
function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

//function to get next palindrome date
function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let counter = 0;

    while (1) {
        counter++;
        let nextDateStr = convertDateToString(nextDate);
        let resultList = palindromeCheckForAllFormats(nextDateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function delay() {
    setTimeout(() => {
        gif.style.display = "block";
    }, 10);
}

function stop() {
    setTimeout(() => {
        gif.style.display = "none";
    }, 2000);
}

function refreshRecord() {
    msg.innerText = "";
}


//console.log(palindromeCheckForAllFormats("2021-09-08"));

document.querySelector('.btn').addEventListener("click", () => {
    refreshRecord();
    let dob = birthDate.value;
    let date = dob.split('-');
    let dd = date[2];
    let mn = date[1];
    let yr = date[0];

    let dt = {
        day: Number(dd),
        month: Number(mn),
        year: Number(yr)
    };

    let checkFlg = false;

    if (dob != "") {
        var list = palindromeCheckForAllFormats(dt);
        for (var i = 0; i < list.length; i++) {
            if (list[i]) {
                checkFlg = true;
                break;
            }
        }

        if (checkFlg == false) {
            const [control, nextDate] = getNextPalindromeDate(dt);
            delay();
            stop();
            setTimeout(() => {
                msg.innerText = `Your birthdate is not palindrome 😟. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${control} days 😮.`;
            }, 2000);
        } else {
            delay();
            stop();
            setTimeout(() => {
                msg.innerText = "Yay 😄! your birthdate is palindrome";
            }, 2000);
        }
    }
});