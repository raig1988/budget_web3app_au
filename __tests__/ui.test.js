import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { budget, category, expenses, summary, summaryYear, summaryMonth, summaryCategory } from '../testData/budgetData';
import Home from '../pages/index'
import Budget from '../pages/budget';
import Expenses from '../pages/expenses';
import TableDetail from '../components/tables/tableDetail';
import TableSummaryExpense from '../components/tables/tableSummaryExpense';
import Summary from '../pages/summary';
import TableYearSummary from '../components/tables/tableYearSummary';
import ChartEvoExpenses from '../components/graphs/chartEvoExpenses';
import ChartExpByCategory from '../components/graphs/chartExpByCategory';

// for fixing canvas Charting
global.ResizeObserver = require('resize-observer-polyfill')

// testing mantra: Focus on tests for the users and developers, not for the tests stake
// https://kentcdodds.com/blog/testing-implementation-details

jest.mock('next/router', () => require('next-router-mock'));
jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe('Check rendering of components', () => {
  describe('Home', () => {
    it('renders all html tags', async () => {
      render(<Home />)
      expect(screen.getByTestId('homeTitle')).toBeInTheDocument();
      expect(screen.getByTestId('homeContent')).toBeInTheDocument();
      // expect(screen.getByTestId('homeRegisterBtn')).toBeInTheDocument();
      // expect(screen.getByTestId('homeLoginBtn')).toBeInTheDocument();
    })
  })
  describe('Budget', () => {
    it('renders all html tags', async () => {
      render(<Budget budget={budget} />)
      expect(screen.getByTestId('budgetTitle')).toBeInTheDocument();
      expect(screen.getByTestId('budgetExplanation')).toBeInTheDocument();
      expect(screen.getByTestId('budgetForm')).toBeInTheDocument();
      expect(screen.getByTestId('budgetTable')).toBeInTheDocument();
    })
  })
  describe('Expenses', () => {
    it('renders all html tags', async () => {
      render(<Expenses category={category} />)
      expect(screen.getByTestId('expensesTitle')).toBeInTheDocument();
      expect(screen.getByTestId('expensesSelector')).toBeInTheDocument();
      expect(screen.getByTestId('expensesLog')).toBeInTheDocument();
      expect(screen.getByTestId('expensesImage')).toBeInTheDocument();
      expect(screen.getByTestId('expensesLogForm')).toBeInTheDocument();
      expect(screen.getByTestId('expensesTableDetailBtn')).toBeInTheDocument();
      expect(screen.getByTestId('expensesTableSummaryBtn')).toBeInTheDocument();
      expect(screen.getByTestId('expensesDetailNoData')).toBeInTheDocument();
      expect(screen.getByTestId('expensesSummaryNoData')).toBeInTheDocument();
      const user = userEvent.setup()
      // get btn
      const detailBtn = screen.getByRole('button', {name: 'Detail'});
      // set for updating state in react
      await user.click(detailBtn)
      render(<TableDetail expenses={expenses} />)
      expect(screen.getByTestId('expensesTableDetail')).toBeInTheDocument()
      const summaryBtn = screen.getByRole('button', {name: 'Summary'})
      await user.click(summaryBtn);
      render(<TableSummaryExpense summary={summary} />)
      expect(screen.getByTestId('expensesTableSummary')).toBeInTheDocument();
    })
  })
  describe('Summary', () => {
    it('renders all html tags', async () => {
      render(<Summary />)
      expect(screen.getByTestId('summaryTitle')).toBeInTheDocument();
      expect(screen.getByTestId('summaryExplanation')).toBeInTheDocument();
      expect(screen.getByTestId('summarySelector')).toBeInTheDocument();
      const imageBtn = screen.getByTestId('summaryQuestionMarkImage')
      const user = userEvent.setup()
      await user.click(imageBtn)
      const yearInput = screen.getByTestId('summaryYearInput')
      const displayBtn = screen.getByRole('button', {name: 'Display'});
      await user.click(displayBtn);
      render(<TableYearSummary summaryData={summaryYear} />)
      expect(screen.getByTestId('summaryTableYear')).toBeInTheDocument();
      render(<ChartEvoExpenses summaryMonth={summaryMonth}/>)
      expect(screen.getByTestId('summaryEvoExpenses')).toBeInTheDocument();
      render(<ChartExpByCategory summaryCategory={summaryCategory} />)
      expect(screen.getByTestId('summaryCategoryExpenses')).toBeInTheDocument();
    })
  })
})