
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