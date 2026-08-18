/**
 * Centralized mock data for frontend-only development.
 * Services consume this data as if it came from a backend API.
 */

export const CATEGORIES = [
  'All',
  'Power Tools',
  'Hand Tools',
  'Electronics',
  'Cameras',
  'Musical Instruments',
  'Sports Equipment',
  'Camping Gear',
  'Others',
];

export const mockUsers = {
  currentUser: {
    id: 1,
    name: 'Mohit',
    email: 'mohit@example.com',
    role: 'borrower',
    authenticated: true,
  },
  owners: [
    { id: 12, name: 'Arjun' },
    { id: 13, name: 'Priya' },
    { id: 14, name: 'Rahul' },
    { id: 15, name: 'Sneha' },
    { id: 16, name: 'Vikram' },
  ],
};

export const mockTools = [
  {
    id: 1,
    name: 'Cordless Drill',
    category: 'Power Tools',
    condition: 'Good',
    owner: { id: 12, name: 'Arjun' },
    availability: 'available',
    image: null,
    description:
      '18V cordless drill with two batteries and a charger. Ideal for home projects, furniture assembly, and light construction work.',
    lendingTerms:
      'Return the tool by the agreed date and in the same condition in which it was received. Batteries must be returned fully charged.',
    addedAt: '2026-02-10',
  },
  {
    id: 2,
    name: 'Circular Saw',
    category: 'Power Tools',
    condition: 'Excellent',
    owner: { id: 13, name: 'Priya' },
    availability: 'borrowed',
    image: null,
    description:
      '7¼-inch circular saw with adjustable depth. Comes with a carrying case and spare blade.',
    lendingTerms:
      'Return the tool by the agreed date and in the same condition in which it was received. Clean sawdust after use.',
    addedAt: '2026-01-28',
  },
  {
    id: 3,
    name: 'Socket Wrench Set',
    category: 'Hand Tools',
    condition: 'Good',
    owner: { id: 14, name: 'Rahul' },
    availability: 'available',
    image: null,
    description:
      'Complete metric and imperial socket set with ratchet handle. 32 pieces in a sturdy case.',
    lendingTerms:
      'Return all pieces in the case. Missing sockets will be charged at replacement cost.',
    addedAt: '2026-02-05',
  },
  {
    id: 4,
    name: 'Digital Multimeter',
    category: 'Electronics',
    condition: 'Good',
    owner: { id: 15, name: 'Sneha' },
    availability: 'available',
    image: null,
    description:
      'Auto-ranging digital multimeter for voltage, current, and resistance measurements. Includes test leads.',
    lendingTerms:
      'Handle with care. Do not exceed rated limits. Return with test leads attached.',
    addedAt: '2026-02-12',
  },
  {
    id: 5,
    name: 'DSLR Camera Kit',
    category: 'Cameras',
    condition: 'Excellent',
    owner: { id: 16, name: 'Vikram' },
    availability: 'available',
    image: null,
    description:
      'Entry-level DSLR with 18-55mm lens, strap, and memory card. Great for events and photography learning.',
    lendingTerms:
      'Return with lens cap on. No sand or water exposure. Memory card contents must be cleared before return.',
    addedAt: '2026-01-15',
  },
  {
    id: 6,
    name: 'Acoustic Guitar',
    category: 'Musical Instruments',
    condition: 'Fair',
    owner: { id: 12, name: 'Arjun' },
    availability: 'pending',
    image: null,
    description:
      'Full-size acoustic guitar with soft case. Some cosmetic wear but plays well and stays in tune.',
    lendingTerms:
      'Keep in case when not in use. No modifications. Return with fresh strings if broken during borrowing.',
    addedAt: '2026-01-20',
  },
  {
    id: 7,
    name: 'Camping Tent (4-Person)',
    category: 'Camping Gear',
    condition: 'Good',
    owner: { id: 13, name: 'Priya' },
    availability: 'available',
    image: null,
    description:
      'Waterproof 4-person dome tent with rainfly, stakes, and carry bag. Easy setup in under 10 minutes.',
    lendingTerms:
      'Clean and dry before return. Report any damage to poles or fabric immediately.',
    addedAt: '2026-02-08',
  },
  {
    id: 8,
    name: 'Badminton Racket Set',
    category: 'Sports Equipment',
    condition: 'Good',
    owner: { id: 14, name: 'Rahul' },
    availability: 'available',
    image: null,
    description:
      'Two rackets with shuttlecocks in a zippered bag. Suitable for casual and intermediate play.',
    lendingTerms:
      'Return all items in the bag. Replace lost shuttlecocks at market rate.',
    addedAt: '2026-02-14',
  },
  {
    id: 9,
    name: 'Measuring Tape (8m)',
    category: 'Hand Tools',
    condition: 'Excellent',
    owner: { id: 15, name: 'Sneha' },
    availability: 'available',
    image: null,
    description:
      'Heavy-duty 8-metre measuring tape with lock mechanism and belt clip.',
    lendingTerms:
      'Return the tool by the agreed date and in the same condition in which it was received.',
    addedAt: '2026-02-16',
  },
  {
    id: 10,
    name: 'Pressure Washer',
    category: 'Others',
    condition: 'Good',
    owner: { id: 16, name: 'Vikram' },
    availability: 'borrowed',
    image: null,
    description:
      'Electric pressure washer for patios, driveways, and outdoor furniture. Includes two nozzle tips.',
    lendingTerms:
      'Use only with clean water. Do not run dry. Return hoses coiled neatly.',
    addedAt: '2026-01-30',
  },
  {
    id: 11,
    name: 'Soldering Iron Kit',
    category: 'Electronics',
    condition: 'Good',
    owner: { id: 12, name: 'Arjun' },
    availability: 'available',
    image: null,
    description:
      'Adjustable temperature soldering iron with stand, sponge, and solder wire.',
    lendingTerms:
      'Allow iron to cool before packing. Return all accessories in the tin box.',
    addedAt: '2026-02-11',
  },
  {
    id: 12,
    name: 'Toolbox Starter Kit',
    category: 'Hand Tools',
    condition: 'Good',
    owner: { id: 13, name: 'Priya' },
    availability: 'available',
    image: null,
    description:
      'Basic toolbox with hammer, screwdrivers, pliers, and assorted screws. Perfect for first-time DIY.',
    lendingTerms:
      'Return all tools in the box. Missing items must be replaced before return is accepted.',
    addedAt: '2026-02-18',
  },
];

export const mockBorrowings = [
  {
    id: 101,
    toolId: 2,
    toolName: 'Circular Saw',
    toolImage: null,
    owner: { id: 13, name: 'Priya' },
    startDate: '2026-02-20',
    endDate: '2026-03-06',
    dueDate: '2026-03-06',
    status: 'active',
  },
  {
    id: 102,
    toolId: 10,
    toolName: 'Pressure Washer',
    toolImage: null,
    owner: { id: 16, name: 'Vikram' },
    startDate: '2026-02-25',
    endDate: '2026-03-04',
    dueDate: '2026-03-04',
    status: 'active',
  },
  {
    id: 103,
    toolId: 6,
    toolName: 'Acoustic Guitar',
    toolImage: null,
    owner: { id: 12, name: 'Arjun' },
    startDate: '2026-02-28',
    endDate: '2026-03-14',
    dueDate: '2026-03-14',
    status: 'pending',
  },
];

export const mockReservations = [
  {
    id: 201,
    toolId: 6,
    userId: 1,
    startDate: '2026-02-28',
    endDate: '2026-03-14',
    status: 'pending',
  },
];

export const mockNotifications = [
  {
    id: 301,
    message: 'Your request for Acoustic Guitar is pending owner approval.',
    type: 'info',
    read: false,
    createdAt: '2026-02-28T09:15:00',
  },
  {
    id: 302,
    message: 'Pressure Washer is due for return on Mar 4.',
    type: 'warning',
    read: false,
    createdAt: '2026-03-01T08:00:00',
  },
  {
    id: 303,
    message: 'Cordless Drill was added to your community catalog.',
    type: 'info',
    read: true,
    createdAt: '2026-02-10T14:30:00',
  },
];

export const mockBorrowingSummary = {
  activeBorrowings: 2,
  pendingRequests: 1,
  dueSoon: 1,
};
