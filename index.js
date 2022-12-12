// Your code here
function createEmployeeRecord(array){
    return{
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents : [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(arrayRecords){
    return arrayRecords.map(records => createEmployeeRecord(records));
}

function createTimeInEvent(employee,timeStamp){
    //Splits the timestamp to get date and time
    let [dateIn, timeIn] = timeStamp.split(" ");

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeIn,10),
        date: dateIn
    })
    return employee
}
function createTimeOutEvent(employee,timeOutStamp){
    //Splits the timestamp to get date and time
    let [dateOut, timeOut] = timeOutStamp.split(" ");

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeOut, 10),
        date: dateOut
        })
    return employee
}


function hoursWorkedOnDate(employeeRecord, dateStamp){
    let hoursWorked
    let hourIn
    let hourOut
    employeeRecord.timeInEvents.forEach((timeIn)=>{
        if (timeIn.date === dateStamp){
            hourIn = timeIn.hour/100
        }
    })
    employeeRecord.timeOutEvents.forEach((timeOut)=>{
        if (timeOut.date === dateStamp){
            hourOut = timeOut.hour/100
        }
    })
    hoursWorked = hourOut - hourIn
    return hoursWorked
}
function wagesEarnedOnDate(employee,dateStamp){
    return hoursWorkedOnDate(employee,dateStamp)* employee.payPerHour;
}
function allWagesFor(employeeRecord){
    let allDates = []
    let pay = 0
    employeeRecord.timeOutEvents.forEach((timeOut)=>{
        allDates.push(timeOut.date)
    })
    allDates.forEach((date) => {
        pay = pay + wagesEarnedOnDate(employeeRecord, date)
    })
    return pay
}

function calculatePayroll(employeeRecordArray){
    let totalPayOwed = 0
    employeeRecordArray.forEach(employeeRecord => {
       totalPayOwed += allWagesFor(employeeRecord)
    })
    return totalPayOwed
}

