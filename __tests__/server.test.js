import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { createMockContext } from '../context'

let mockCtx;
let ctx;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx;
})

describe('testing database', () => {
    describe('user', () => {
        test('should create new user ', async () => {
            const user = {
                email: 'test@test.com',
                password: 123,
            }
            mockCtx.prisma.user.create.mockResolvedValue(user);
            let createUser = ctx.prisma.user.create({
                data: user,
            })
            await expect(createUser).resolves.toEqual({
                email: 'test@test.com',
                password: 123,
            })
            })
        test('finds user ', async () => {
            const user = {
                email: 'test@test.com',
            }
            mockCtx.prisma.user.findUnique.mockResolvedValue(user);
            let findUser = ctx.prisma.user.findUnique({
                data: user,
            })
            await expect(findUser).resolves.toEqual({
                email: 'test@test.com',
            })
            })
        test('change password ', async () => {
            const user = {
                email: 'test@test.com',
                password: 456
            }
            mockCtx.prisma.user.update.mockResolvedValue(user);
            let findUser = ctx.prisma.user.update({
                data: user,
            })
            await expect(findUser).resolves.toEqual({
                email: 'test@test.com',
                password: 456,
            })
        })
        test('delete user ', async () => {
            const user = {
                email: 'test@test.com',
            }
            mockCtx.prisma.user.delete.mockResolvedValue(user);
            let findUser = ctx.prisma.user.delete({
                data: user,
            })
            await expect(findUser).resolves.toEqual({
                email: 'test@test.com',
            })
        })
    }),
    describe('expenses', () => {
        test('register expense ', async () => {
            const expense = {
                userId: 1,
                day: 1,
                month: 1,
                year: 2023,
                category_id: 1,
                description: 'test',
                amount: 1,
            }
            mockCtx.prisma.expenses.create.mockResolvedValue(expense);
            let findUser = ctx.prisma.expenses.create({
                data: expense,
            })
            await expect(findUser).resolves.toEqual({
                userId: 1,
                day: 1,
                month: 1,
                year: 2023,
                category_id: 1,
                description: 'test',
                amount: 1,
            })
        })
        test('delete expense ', async () => {
            const expense = {
                id: 1,
            }
            mockCtx.prisma.expenses.delete.mockResolvedValue(expense);
            let findUser = ctx.prisma.expenses.delete({
                data: expense,
            })
            await expect(findUser).resolves.toEqual({
                id: 1
            })
        })
    })
    describe('budget', () => {
        test('register budget ', async () => {
            const budget = {
                userId: 1,
                category: 1,
                amount: 100
            }
            mockCtx.prisma.budget.create.mockResolvedValue(budget);
            let element = ctx.prisma.budget.create({
                data: budget,
            })
            await expect(element).resolves.toEqual({
                userId: 1,
                category: 1,
                amount: 100
            })
        })
        test('update budget ', async () => {
            const budget = {
                id: 1,
                amount: 200
            }
            mockCtx.prisma.budget.update.mockResolvedValue(budget);
            let element = ctx.prisma.budget.update({
                data: budget,
            })
            await expect(element).resolves.toEqual({
                id: 1,
                amount: 200
            })
        })
        test('delete budget ', async () => {
            const budget = {
                id: 1,
            }
            mockCtx.prisma.budget.delete.mockResolvedValue(budget);
            let element = ctx.prisma.budget.delete({
                data: budget,
            })
            await expect(element).resolves.toEqual({
                id: 1,
            })
        })
        test('get budget ', async () => {
            const budget = {
                userId: 1,
            }
            mockCtx.prisma.budget.findMany.mockResolvedValue(budget);
            let element = ctx.prisma.budget.findMany({
                data: budget,
            })
            await expect(element).resolves.toEqual({
                userId: 1,
            })
        })
    })
    describe('global', () => {
        test('global expense by month and year ', async () => {
            const expenses = {
                userId: 1,
                month: 1,
                year: 2023,
            }
            mockCtx.prisma.expenses.findMany.mockResolvedValue(expenses);
            let element = ctx.prisma.expenses.findMany({
                data: expenses,
            })
            await expect(element).resolves.toEqual({
                userId: 1,
                month: 1,
                year: 2023,
            })
        })
        test('global summary by month and year ', async () => {
            const expenses = {
                userId: 1,
                month: 1,
                year: 2023,
            }
            mockCtx.prisma.expenses.groupBy.mockResolvedValue(expenses);
            let element = ctx.prisma.expenses.groupBy({
                data: expenses,
            })
            await expect(element).resolves.toEqual({
                userId: 1,
                month: 1,
                year: 2023,
            })
        })
        test('global total summary by year ', async () => {
            const expenses = {
                userId: 1,
                year: 2023,
            }
            mockCtx.prisma.expenses.groupBy.mockResolvedValue(expenses);
            let element = ctx.prisma.expenses.groupBy({
                data: expenses,
            })
            await expect(element).resolves.toEqual({
                userId: 1,
                year: 2023,
            })
        })
    })
})