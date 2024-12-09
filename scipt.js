let start_sys;
let finish_sys;

document.addEventListener('DOMContentLoaded', function () {
    const selectStartSystem = document.getElementById('systems');

    function handleStartSystemChange(event) {
        start_sys = event.target.value;
        console.log(`Начальная система: ${start_sys}`);
    }

    selectStartSystem.addEventListener('change', handleStartSystemChange);
});

document.addEventListener('DOMContentLoaded', function () {
    const selectFinishSystem = document.getElementById('final-systems');

    function handleFinishSystemChange(event) {
        finish_sys = event.target.value;
        console.log(`Конечная система: ${finish_sys}`);
    }

    selectFinishSystem.addEventListener('change', handleFinishSystemChange);
});

function decimalToBinary(decimalNumber) {
    return decimalNumber.toString(2);
}

function decimalToOctal(decimalNumber) {
    return decimalNumber.toString(8);
}

function decimalToHexadecimal(decimalNumber) {
    return decimalNumber.toString(16).toUpperCase();
}

function isValidRomanNumber(roman) {
    const validChars = 'MDCLXVII';
    for (let char of roman) {
        if (validChars.indexOf(char) === -1) {
            return false;
        }
    }

    const invalidCombos = ['IIII', 'XXXX', 'CCCC', 'VIV', 'LL', 'DD'];
    for (let combo of invalidCombos) {
        if (roman.includes(combo)) {
            return false;
        }
    }

    return true;
}

function romanToDecimal(roman) {
    if (!isValidRomanNumber(roman)) {
        return "Неправильное римское число";
    }

    const romanMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let result = 0;
    let previousValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        let currentValue = romanMap[roman[i]];

        if (currentValue < previousValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }

        previousValue = currentValue;
    }

    return result;
}

function decimalToRoman(decimalNumber) {
    let romanValues = [
        { value: 1000, symbol: "M" },
        { value: 900, symbol: "CM" },
        { value: 500, symbol: "D" },
        { value: 400, symbol: "CD" },
        { value: 100, symbol: "C" },
        { value: 90, symbol: "XC" },
        { value: 50, symbol: "L" },
        { value: 40, symbol: "XL" },
        { value: 10, symbol: "X" },
        { value: 9, symbol: "IX" },
        { value: 5, symbol: "V" },
        { value: 4, symbol: "IV" },
        { value: 1, symbol: "I" }
    ];

    let romanNumber = "";

    for (let i = 0; i < romanValues.length; i++) {
        while (decimalNumber >= romanValues[i].value) {
            romanNumber += romanValues[i].symbol;
            decimalNumber -= romanValues[i].value;
        }
    }

    return romanNumber;
}

function calculation() {
    let inputElement = document.getElementById('input_system');
    let value = inputElement.value.trim().toUpperCase();

    const decimalRegex = /^[0-9]+$/;
    const binaryRegex = /^[01]+$/;
    const octalRegex = /^[0-7]+$/;
    const hexadecimalRegex = /^[0-9A-Fa-f]+$/;
    const romanNumeralsRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

    let result;

    if (start_sys === 'decimal' && decimalRegex.test(value)) {
        result = Number(value);
    } else if (start_sys === 'binary' && binaryRegex.test(value)) {
        result = parseInt(value, 2);
    } else if (start_sys === 'octal' && octalRegex.test(value)) {
        result = parseInt(value, 8);
    } else if (start_sys === 'hexadecimal' && hexadecimalRegex.test(value)) {
        result = parseInt(value, 16);
    } else if (start_sys === 'roman' && romanNumeralsRegex.test(value)) {
        result = romanToDecimal(value);
    } else {
        alert("Некорректные данные");
        return;
    }

    if (!result) {
        alert("Некорректные данные");
        return;
    }

    interval = result;

    if (finish_sys === 'binary') {
        result = decimalToBinary(interval);
    } else if (finish_sys === 'octal') {
        result = decimalToOctal(interval);
    } else if (finish_sys === 'hexadecimal') {
        result = decimalToHexadecimal(interval);
    } else if (finish_sys === 'roman') {
        result = decimalToRoman(interval);
    }

    document.getElementById('output_result').innerHTML = 'Результат: ' + result;
}


