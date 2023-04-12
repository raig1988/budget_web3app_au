export const budget = [
    {
      amount: 664,
      category : "Services",
      createdAt: "2023-04-03T15:25:01.757Z",
      id: 40,
      updatedAt: "2023-04-06T10:56:48.433Z",
      userId: 1,
    }, 
    {
      amount: 1000,
      category: "Others",
      createdAt: "2023-04-03T15:25:14.526Z",
      id: 41,
      updatedAt: "2023-04-06T10:56:57.296Z",
      userId: 1,
    }
  ]

  export const category = [
    {
    category: 'Services',
    id: 1
    },
    {
      category: 'Others',
      id: 2
    }
  ]

  export const expenses = [
    {
        "id": 142,
        "userId": 1,
        "day": 1,
        "month": 4,
        "year": 2022,
        "category_id": 39,
        "description": "Vultr Gala",
        "amount": 240,
        "createdAt": "2023-04-03T17:27:51.929Z",
        "updatedAt": "2023-04-03T17:27:51.929Z",
        "category": {
            "category": "Apps"
        }
    },
    {
        "id": 143,
        "userId": 1,
        "day": 9,
        "month": 4,
        "year": 2022,
        "category_id": 39,
        "description": "Win hof 1 mes",
        "amount": 19.9,
        "createdAt": "2023-04-03T17:27:51.929Z",
        "updatedAt": "2023-04-03T17:27:51.929Z",
        "category": {
            "category": "Apps"
        }
    },
    {
        "id": 144,
        "userId": 1,
        "day": 14,
        "month": 4,
        "year": 2022,
        "category_id": 39,
        "description": "Bankless",
        "amount": 88,
        "createdAt": "2023-04-03T17:27:51.929Z",
        "updatedAt": "2023-04-03T17:27:51.929Z",
        "category": {
            "category": "Apps"
        }
    },
]

export const summary = [
  {
      "_sum": {
          "amount": 136.2
      },
      "category_id": 42,
      "category": "Supplements",
      "amount": 155,
      "net": 18.8
  },
  {
      "_sum": {
          "amount": 101.9
      },
      "category_id": 45,
      "category": "Cleaning",
      "amount": 360,
      "net": 258.1
  },
  {
      "_sum": {
          "amount": 1399.56
      },
      "category_id": 38,
      "category": "Food",
      "amount": 1500,
      "net": 100.44
  },
  {
      "_sum": {
          "amount": 1120.14
      },
      "category_id": 41,
      "category": "Others",
      "amount": 1000,
      "net": -120.14
  },
  {
      "_sum": {
          "amount": 2000
      },
      "category_id": 46,
      "category": "Rent",
      "amount": 2000,
      "net": 0
  },
  {
      "_sum": {
          "amount": 568
      },
      "category_id": 40,
      "category": "Services",
      "amount": 664,
      "net": 96
  },
  {
      "_sum": {
          "amount": 198.4
      },
      "category_id": 43,
      "category": "Personal Care",
      "amount": 278,
      "net": 79.6
  },
  {
      "_sum": {
          "amount": 755.79
      },
      "category_id": 39,
      "category": "Apps",
      "amount": 576,
      "net": -179.79
  },
  {
      "_sum": {
          "amount": 320
      },
      "category_id": 44,
      "category": "Insurance",
      "amount": 510,
      "net": 190
  }
]


export const summaryYear = [
    {
        "_sum": {
            "amount": 122.8
        },
        "category_id": 40,
        "month": 1,
        "monthName": "January",
        "category": "Services"
    },
    {
        "_sum": {
            "amount": 154.5
        },
        "category_id": 42,
        "month": 1,
        "monthName": "January",
        "category": "Supplements"
    },
    {
        "_sum": {
            "amount": 284.8
        },
        "category_id": 43,
        "month": 1,
        "monthName": "January",
        "category": "Personal Care"
    },
    {
        "_sum": {
            "amount": 1485.97
        },
        "category_id": 41,
        "month": 1,
        "monthName": "January",
        "category": "Others"
    },
    {
        "_sum": {
            "amount": 179.72
        },
        "category_id": 39,
        "month": 1,
        "monthName": "January",
        "category": "Apps"
    },
]

export const summaryMonth = [
    {
        "_sum": {
            "amount": 6593.040000000001
        },
        "month": 1
    },
    {
        "_sum": {
            "amount": 10812.17
        },
        "month": 2
    },
    {
        "_sum": {
            "amount": 13365.62
        },
        "month": 3
    },
    {
        "_sum": {
            "amount": 6599.990000000002
        },
        "month": 4
    },
    {
        "_sum": {
            "amount": 8117.069999999999
        },
        "month": 5
    },
    {
        "_sum": {
            "amount": 7171.3
        },
        "month": 6
    },
    {
        "_sum": {
            "amount": 8169.009999999998
        },
        "month": 7
    },
    {
        "_sum": {
            "amount": 10327.65
        },
        "month": 8
    },
    {
        "_sum": {
            "amount": 8430.630000000001
        },
        "month": 9
    },
    {
        "_sum": {
            "amount": 3502.82
        },
        "month": 10
    }
]

export const summaryCategory = [
    {
        "_sum": {
            "amount": 895.2000000000005
        },
        "category_id": 42,
        "category": "Supplements"
    },
    {
        "_sum": {
            "amount": 1537.74
        },
        "category_id": 45,
        "category": "Cleaning"
    },
    {
        "_sum": {
            "amount": 13499.94999999999
        },
        "category_id": 38,
        "category": "Food"
    },
    {
        "_sum": {
            "amount": 25437.19000000001
        },
        "category_id": 41,
        "category": "Others"
    },
    {
        "_sum": {
            "amount": 20812.32
        },
        "category_id": 46,
        "category": "Rent"
    },
    {
        "_sum": {
            "amount": 5392.499999999999
        },
        "category_id": 40,
        "category": "Services"
    },
    {
        "_sum": {
            "amount": 6242.329999999999
        },
        "category_id": 43,
        "category": "Personal Care"
    },
    {
        "_sum": {
            "amount": 5365.609999999998
        },
        "category_id": 39,
        "category": "Apps"
    },
    {
        "_sum": {
            "amount": 3906.46
        },
        "category_id": 44,
        "category": "Insurance"
    }
]