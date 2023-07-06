
export function toggleLogExpense(e, logExpenseToggle, setLogExpenseToggle, expenseFormRef) {
    if (e.target.dataset.id === "questionMark") {
      if (!logExpenseToggle) {
        expenseFormRef.current.style.display = "block";
        setLogExpenseToggle((prevState) => !prevState);
      } else {
        expenseFormRef.current.style.display = "none";
        setLogExpenseToggle((prevState) => !prevState);
      }
    }
}

export function summaryOrDetail(e, detailTableToggle, setDetailTableToggle, tableDetailRef, tableSumExpToggle, setTableSumExpToggle, tableSumExpRef) {
    if (e.target.dataset.id === "tableDetail") {
      if (!detailTableToggle) {
        tableDetailRef.current.style.display = "block";
        setDetailTableToggle((prevState) => !prevState);
        if (tableSumExpToggle) {
          tableSumExpRef.current.style.display = "none";
          setTableSumExpToggle((prevState) => !prevState);
        }
      } else {
        tableDetailRef.current.style.display = "none";
        setDetailTableToggle((prevState) => !prevState);
      }
    } else if (e.target.dataset.id === "tableSummaryExpense") {
      if (!tableSumExpToggle) {
        tableSumExpRef.current.style.display = "block";
        setTableSumExpToggle((prevState) => !prevState);
        if (detailTableToggle) {
          tableDetailRef.current.style.display = "none";
          setDetailTableToggle((prevState) => !prevState);
        }
      } else {
        tableSumExpRef.current.style.display = "none";
        setTableSumExpToggle((prevState) => !prevState);
      }
    }
  }

export function toggleBudgetExp(toggleBudgetExplanation, setToggleBudgetExplanation , budgetExplanationRef) {
    if (!toggleBudgetExplanation) {
      budgetExplanationRef.current.style.display = "block";
      setToggleBudgetExplanation(prevState => !prevState);
    } else {
      budgetExplanationRef.current.style.display = "none";
      setToggleBudgetExplanation(prevState => !prevState);
    }
  }


export function toggleNav(toggle, setToggle ,navRef) {
    if (!toggle) {
        navRef.current.style.display = 'flex';
        setToggle(true);
    } else {
        navRef.current.style.display = 'none';
        setToggle(false);
    }
}


export const countDecimals = Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

export const passwordReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{5,}$/;

export function setMonthName(array) {
  array.month == 1 ? array.monthName = "January" 
  : array.month == 2 ? array.monthName = "February" 
  : array.month == 3 ? array.monthName = "March" 
  : array.month == 4 ? array.monthName = "April" 
  : array.month == 5 ? array.monthName = "May" 
  : array.month == 6 ? array.monthName = "June" 
  : array.month == 7 ? array.monthName = "July" 
  : array.month == 8 ? array.monthName = "August" 
  : array.month == 9 ? array.monthName = "September" 
  : array.month == 10 ? array.monthName = "October" 
  : array.month == 11 ? array.monthName = "November" 
  : array.month == 12 ? array.monthName = "December" : null;
}

