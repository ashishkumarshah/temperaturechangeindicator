input.onButtonPressed(Button.A, function () {
    basic.showNumber(currentTemperature)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(averageTemperature)
})
let evictedTemperature = 0
let temperatureSum = 0
let averageTemperature = 0
let currentTemperature = 0
let temperatures: number[] = []
let maxReadingCount = 24
let delay = 300000
let displayInterval = 2000
basic.forever(function () {
    currentTemperature = input.temperature()
    if (temperatures.length < maxReadingCount) {
        temperatures.push(currentTemperature)
        temperatureSum += currentTemperature
    } else {
        evictedTemperature = temperatures.shift()
        temperatures.push(currentTemperature)
        temperatureSum = temperatureSum - evictedTemperature + currentTemperature
    }
    if (currentTemperature > averageTemperature) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            . . . . .
            `,displayInterval)
    } else if (currentTemperature < averageTemperature) {
        basic.showLeds(`
            . . . . .
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            `,displayInterval)
    } else {
        basic.showIcon(IconNames.Happy,displayInterval)
    }
    averageTemperature = temperatureSum / temperatures.length
    basic.clearScreen()
    basic.pause(delay)
})
