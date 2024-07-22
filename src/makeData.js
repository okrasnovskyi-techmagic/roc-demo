import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newWBS = () => {
  return {
    level: faker.number.int({ min: 1, max: 5 }),
    code: faker.number.int({ min: 1000, max: 10000 }),
    description: faker.word.adjective(),
    cbs: faker.number.int({ min: 1000, max: 10000 }),
    parent: faker.number.int({ min: 1, max: 5 }),
    unit: faker.science.chemicalElement().name,
    cbs3: faker.number.int({ min: 10000, max: 100000 }),
  };
};

export const makeData = (...lens) => {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];

    return range(len).map((d) => {
      return {
        ...newWBS(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
};

export const wbsdata = [
  {
    level: 1,
    code: "1",
    description: "Scheme Design",
    cbs: "1",
    parent: undefined,
    unit: "Sum",
    cbs3: undefined,
    subRows: [
      {
        level: 2,
        code: "1.1",
        description: "Scheme Design",
        cbs: "110000",
        parent: undefined,
        unit: "Sum",
        cbs3: undefined,
        subRows: [
          {
            level: 3,
            code: "1.1.1",
            description: "Develop Geometry",
            cbs: "110100",
            parent: undefined,
            unit: "Sum",
            cbs3: undefined,
          },
          {
            level: 3,
            code: "1.1.2",
            description: "Highways Design",
            cbs: "110200",
            parent: undefined,
            unit: "Sum",
            cbs3: undefined,
          },
          {
            level: 3,
            code: "1.1.3",
            description: "Structures Design",
            cbs: "110300",
            parent: undefined,
            unit: "Sum",
            cbs3: undefined,
          },
          {
            level: 3,
            code: "1.1.4",
            description: "Technology Design",
            cbs: "110400",
            parent: undefined,
            unit: "Sum",
            cbs3: undefined,
          },
          {
            level: 3,
            code: "1.1.5",
            description: "Environmental Design",
            cbs: "110500",
            parent: undefined,
            unit: "Sum",
            cbs3: undefined,
          },
        ],
      },
    ],
  },
  {
    level: 1,
    code: "10",
    description: "Employers Direct Costs",
    cbs: "D",
    parent: undefined,
    unit: undefined,
    cbs3: undefined,
    subRows: [
      {
        level: 2,
        code: "2.1",
        description: "Project Management",
        cbs: "210000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
      },
      {
        level: 2,
        code: "2.2",
        description: "Project Management",
        cbs: "220000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
      },
    ],
  },
  {
    level: 1,
    code: "3",
    description: "Operations",
    cbs: "3",
    parent: undefined,
    unit: undefined,
    cbs3: undefined,
    subRows: [
      {
        level: 2,
        code: "3.1",
        description: "Operations Performance Data",
        cbs: "310000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
        subRows: [
          {
            level: 3,
            code: "3.1.1",
            description: "Network Performance Data",
            cbs: "310100",
            parent: undefined,
            unit: undefined,
            cbs3: undefined,
          },
          {
            level: 3,
            code: "3.1.2",
            description: "Asset Performance Data",
            cbs: "310200",
            parent: undefined,
            unit: undefined,
            cbs3: undefined,
          },
        ],
      },
      {
        level: 2,
        code: "3.2",
        description: "Operational Concept",
        cbs: "320000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
      },
      {
        level: 2,
        code: "3.3",
        description: "Road Bookings",
        cbs: "330000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
      },
      {
        level: 2,
        code: "3.4",
        description: "Operating Regime",
        cbs: "340000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
      },
      {
        level: 2,
        code: "3.5",
        description: "Bringing into Operation",
        cbs: "350000",
        parent: undefined,
        unit: undefined,
        cbs3: undefined,
      },
    ],
  },
];

export const wbsmapdata = [
  "3.1.1 Network Performance Data 310000",
  "3.1.2 Operational Concept 320000",
  "3.1.3 Road Bookings 330000",
  "3.1.4 Operating Regime 340000",
  "3.1.5 Bringing into Operation 350000",
];
