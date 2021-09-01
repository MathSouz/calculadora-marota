const memoryDisplay = document.querySelector("#memory")
const currentDisplay = document.querySelector("#current")
const operationDisplay = document.querySelector("#operation")
let operations = ['+', '-', '*', '/']
let operation

function onPress(char)
{
    if(char == 'C')
    {
        currentDisplay.innerHTML = 0;
        memoryDisplay.innerHTML = '';
        operationDisplay.innerHTML = '';
        return;
    }

    if(char == '=')
    {
        const values = []
        
        values[0] = memoryDisplay.innerHTML
        values[1] = currentDisplay.innerHTML
        
        try
        {
            const value = operate(values[0], values[1], operation)
            currentDisplay.innerHTML = value
            memoryDisplay.innerHTML = ''
            operation = undefined
            operationDisplay.innerHTML = ''
            validateCurrentDisplay()
        }

        catch(err)
        {
            if(err.err == 0)
            {
                currentDisplay.innerHTML = parseFloat(currentDisplay.innerHTML)   
            }
        }

        return
    }

    if(operations.includes(char))
    {
        operation = char
        memoryDisplay.innerHTML = currentDisplay.innerHTML
        operationDisplay.innerHTML = operation
        currentDisplay.innerHTML = 0
        return;
    }

    if(char == ',')
    {
        currentDisplay.innerHTML += '.'
    }

    if(parseFloat(currentDisplay.innerHTML) === 0 && !isNaN(char))
        currentDisplay.innerHTML = char
    else if(!isNaN(char))
        currentDisplay.innerHTML += char

    validateCurrentDisplay()
}

function validateCurrentDisplay()
{
    if(currentDisplay.innerHTML.length > 12)
    {
        currentDisplay.innerHTML = currentDisplay.innerHTML.substring(0, 12)
    }
}

function operate(a, b, operation)
{
    a = parseFloat(a)
    b = parseFloat(b)

    if(operations.includes(operation))
    {
        switch(operation)
        {
            case '+': return a + b
            case '-': return a - b
            case '/': return a / b
            case '*': return a * b
        }
    }

    else
    {
        throw {err: 0, msg: "Invalid Operation"}
    }

    throw {err: 1, msg: "Nothing to operate"}
}