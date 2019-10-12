function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const priority = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
        };
        let output = [];
        let stack = [];
        const operations = ['+', '-', '*', '/', '(', ')'];    
        const arrExpr = expr.match(/\d+|\*|\/|\+|-|\(|\)/g);
        arrExpr.map(el => {
        if (el === '(') {
            stack.push(el);
        } else if (el === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
            output.push(stack.pop());
            }
            if (stack.length === 0) {
            throw new Error('ExpressionError: Brackets must be paired');
            }
            stack.pop();
        } else if (Object.keys(priority).indexOf(el) !== -1) {
            while (priority[stack[stack.length - 1]] >= priority[el]) {
            output.push(stack.pop());
            }
            stack.push(el);
        } else {
            output.push(el);
        }
        });
        while (stack.length > 0) {
        if (Object.keys(priority).indexOf(stack[stack.length - 1]) === -1) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
        output.push(stack.pop());
        }
    
        let first = 0;
        let second = 0;
        let temp = 0;
        const plus = (a, b) => a + b;
        const minus = (a, b) => a - b;
        const multuple = (a, b) => a * b;
        const division = (a, b) => {
        if (+b === 0) 
            throw new Error('TypeError: Division by zero.');
            else
            return a / b;
        };
        for (let i = 0; i < output.length; i++) {
        if (operations.indexOf(output[i]) !== -1) {
            first = output[i - 2];
            second = output[i - 1];
            switch (output[i]) {
            case '*':
                temp = multuple(first, second);
                output[i] = temp;
                output.splice(i - 2, 2);
                i = 0;
                break;
            case '/':
                temp = division(first, second);
                output[i] = temp;
                output.splice(i - 2, 2);
                i = 0;
                break;
            case '+':
                temp = plus(+first, +second);
                output[i] = temp;
                output.splice(i - 2, 2);
                i = 0;
                break;
            case '-':
                temp = minus(first, second);
                output[i] = temp;
                output.splice(i - 2, 2);
                i = 0;
                break;
            }
        }
        }
    return output[0];
}
    



module.exports = {
    expressionCalculator
}