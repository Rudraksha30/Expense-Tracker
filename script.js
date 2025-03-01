const expenses = [];
let budgetLimit = 10000;
let editIndex = -1;

document.getElementById("budget-form").addEventListener("submit", function(event) {
    event.preventDefault();
    budgetLimit = Number(document.getElementById("budget-limit").value);
    updateSummary();
});

document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    const expense = { amount, category, date, description };

    if (editIndex === -1) {
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = -1;
    }
    
    updateTable();
    updateSummary();
    this.reset();
});

function updateTable() {
    const tableBody = document.getElementById("expense-table");
    tableBody.innerHTML = "";
    expenses.forEach((expense, index) => {
        const row = `<tr>
            <td>₹${expense.amount}</td>
            <td><span class="badge bg-primary">${expense.category}</span></td>
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function updateSummary() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById("total-expenses").textContent = `₹${totalExpenses}`;
    const progress = (totalExpenses / budgetLimit) * 100;
    document.getElementById("budget-progress").style.width = `${progress}%`;

    const categoryBreakdown = {};
    expenses.forEach(expense => {
        categoryBreakdown[expense.category] = (categoryBreakdown[expense.category] || 0) + expense.amount;
    });

    const breakdownDiv = document.getElementById("category-breakdown");
    breakdownDiv.innerHTML = Object.keys(categoryBreakdown).map(category => 
        `<p>${category}: ₹${categoryBreakdown[category]}</p>`
    ).join("");
}