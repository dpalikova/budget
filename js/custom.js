let form = document.querySelector(".form");
let totalIncomeHolder = document.querySelector(".income_holder");
let totalExpensesHolder = document.querySelector(".expenses_holder");
let expensesPercentage = document.querySelector(".percentage_holder");
let currentBudget = document.querySelector(".budget");
let date = document.querySelector(".date");

function currentDate() {
    let today = new Date()

    date.innerHTML = (today.getMonth()+1) + '/' + today.getFullYear();
}

function createRecord() {
    let createButton = document.querySelector(".create");
    let type = document.querySelector(".record_type");
    let description = document.querySelector(".description");
    let amount = document.querySelector(".value");
    let incomeRecords = document.querySelector(".income_records_holder");
    let expensesRecords = document.querySelector(".expenses_records_holder");

    createButton.onclick = function() {
        
        value = parseFloat(amount.value);
        totalIncome = parseFloat(totalIncomeHolder.textContent);
        totalExpenses = parseFloat(totalExpensesHolder.textContent);
        currentDate = new Date();
        currentDate = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear();

        if (type.value != "" && description.value != "" && value != "" && value > 0) {
            
            if (type.value === "+") {
                totalIncome += value;
                totalIncomeHolder.innerHTML = totalIncome;
                incomeRecords.innerHTML += `<li data-date=` + currentDate + ` data-value=` + value.toFixed(2) + `>
                                                <div class="income_record">
                                                    <div>` + currentDate +`</div>
                                                    <div>` + description.value + `</div>
                                                    <div>
                                                        <div>+ ` + value.toFixed(2) + `</div>
                                                        <div class="remove"><a href="javascript:;" title="Remove Record"><i class="fas fa-minus-circle"></a></i></div>
                                                    </div>
                                                </div>
                                            </li>`;
                incomeOrder("desc_date");
            } else if (type.value === "-") {
                totalExpenses += value;
                totalExpensesHolder.innerHTML = totalExpenses;
                expensesRecords.innerHTML += `<li data-date=` + currentDate + ` data-value=` + value.toFixed(2) + `>
                                                <div class="expense_record">
                                                    <div>` + currentDate +`</div>
                                                    <div>` + description.value + `</div>
                                                    <div>
                                                        <div>- ` + value.toFixed(2) + `</div>
                                                        <div><span class="percentage">`+ (value / totalIncome * 100).toFixed(2) +`%</span></div>
                                                        <div class="remove"><a href="javascript:;" title="Remove Record"><i class="fas fa-minus-circle"></a></i></div>
                                                    </div>
                                                </div>
                                            </li>`;
                expensesOrder("desc_date");                            
            }

            expensesPercentage.innerHTML = (totalExpenses / totalIncome * 100).toFixed(2) + "%";
            currentBudget.innerHTML = totalIncome - totalExpenses;

            
            removeRecord();
            form.reset();

        } else {
            alert("Please fill in all fields with valid data");
        }
    }
}   

function incomeOrder(type) {
    let allIncomeRecords = document.querySelectorAll(".income_records_holder > li");
    
    let orderIncome = [];
    allIncomeRecords.forEach(function(item) {
        orderIncome.push(item);
    })
    
    orderIncome.sort(function(a, b) {
        if (type == "desc_date"){
            return Date.parse(b.getAttribute("data-date")) - Date.parse(a.getAttribute("data-date"));
        } else if (type == "asc_date") {
            return Date.parse(a.getAttribute("data-date")) - Date.parse(b.getAttribute("data-date"));
        } else if (type == "desc_value"){
            return b.getAttribute("data-value") - a.getAttribute("data-value");
        } else if (type == "asc_value") {
            return a.getAttribute("data-value") - b.getAttribute("data-value");
        }
    })

    orderIncome.forEach(function(item) {
        document.querySelector(".income_records_holder").appendChild(item);
    })
}

function expensesOrder(type) {
    let allExpenseRecords = document.querySelectorAll(".expenses_records_holder > li");

    let orderExpenses = [];
    allExpenseRecords.forEach(function(item) {
        orderExpenses.push(item);
    })

    orderExpenses.sort(function(a, b) {
        if (type == "desc_date"){
            return Date.parse(b.getAttribute("data-date")) - Date.parse(a.getAttribute("data-date"));
        } else if (type == "asc_date") {
            return Date.parse(a.getAttribute("data-date")) - Date.parse(b.getAttribute("data-date"));
        } else if (type == "desc_value"){
            return b.getAttribute("data-value") - a.getAttribute("data-value");
        } else if (type == "asc_value") {
            return a.getAttribute("data-value") - b.getAttribute("data-value");
        }
    })

    orderExpenses.forEach(function(item) {
        document.querySelector(".expenses_records_holder").appendChild(item);
    })
}

function sortRecords() {
    let incomeSelect = document.querySelector(".income_sort");
    let expenseSelect = document.querySelector(".expenses_sort");

    incomeSelect.onchange = function () {
        incomeOrder(incomeSelect.value);
    }

    expenseSelect.onchange = function () {
        expensesOrder(expenseSelect.value);
    }
}

function resetButton() {
    let resetButton = document.querySelector(".reset");
    
    resetButton.onclick = function() {
        form.reset();
    }
}

function removeRecord() {
    let removeButton = document.querySelectorAll(".remove");

    for (var i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener("click", function() {
          this.closest("li").remove();
        });
      }

}

createRecord();
resetButton();
sortRecords()
currentDate();