export const mockOrders = [
  {
    id: 1,
    title: 'Order 1',
    description: 'Description for Order 1',
    date: '2023-01-01',
    products: [
      { id: 1, title: 'Product 1', type: 'type1', price: [{ symbol: 'USD', value: 100, isDefault: 1 }, { symbol: 'UAH', value: 2700, isDefault: 0 }], order: 1 },
      { id: 2, title: 'Product 2', type: 'type2', price: [{ symbol: 'USD', value: 200, isDefault: 1 }, { symbol: 'UAH', value: 5400, isDefault: 0 }], order: 1 },
    ],
  },
  {
    id: 2,
    title: 'Order 2',
    description: 'Description for Order 2',
    date: '2023-02-01',
    products: [
      { id: 3, title: 'Product 3', type: 'type3', price: [{ symbol: 'USD', value: 300, isDefault: 1 }, { symbol: 'UAH', value: 8100, isDefault: 0 }], order: 2 },
    ],
  },
];

export const mockProducts = [
  { id: 1, title: 'Product 1', type: 'type1', price: [{ symbol: 'USD', value: 100, isDefault: 1 }, { symbol: 'UAH', value: 2700, isDefault: 0 }], order: 1, serialNumber: 1, isNew: 1, photo: 'photo1.jpg', specification: 'spec1', guarantee: { start: '2023-01-01', end: '2023-12-31' }, date: '2023-01-01' },
  { id: 2, title: 'Product 2', type: 'type2', price: [{ symbol: 'USD', value: 200, isDefault: 1 }, { symbol: 'UAH', value: 5400, isDefault: 0 }], order: 1, serialNumber: 2, isNew: 0, photo: 'photo2.jpg', specification: 'spec2', guarantee: { start: '2023-01-01', end: '2023-12-31' }, date: '2023-01-01' },
  { id: 3, title: 'Product 3', type: 'type3', price: [{ symbol: 'USD', value: 300, isDefault: 1 }, { symbol: 'UAH', value: 8100, isDefault: 0 }], order: 2, serialNumber: 3, isNew: 1, photo: 'photo3.jpg', specification: 'spec3', guarantee: { start: '2023-01-01', end: '2023-12-31' }, date: '2023-01-01' },
];

export const mockStore = {
  orders: {
    orders: mockOrders,
  },
  products: {
    products: mockProducts,
  },
};