import { ObjectHelpers } from "./objectHelpers";

interface Person {
  fullName: string;
  ageInYears: number;
  seasons: {
    launchYear: number;
    numericRepresentation: number;
  }[];
  companyDescription: {
    fullName: string;
    addressDescription: {
      streetName: string;
    };
  };
}

describe("object helper", () => {
  const snakeCase = {
    full_name: "Michael Scott",
    age_in_years: 40,
    seasons: [
      {
        launch_year: 2000,
        numeric_representation: 1,
      },
      {
        launch_year: 2001,
        numeric_representation: 2,
      },
    ],
    company_description: {
      full_name: "Dunder Mifflin",
      address_description: {
        street_name: "Cold Street",
      },
    },
  };
  const camelCase: Person = {
    fullName: "Michael Scott",
    ageInYears: 40,
    seasons: [
      {
        launchYear: 2000,
        numericRepresentation: 1,
      },
      {
        launchYear: 2001,
        numericRepresentation: 2,
      },
    ],
    companyDescription: {
      fullName: "Dunder Mifflin",
      addressDescription: {
        streetName: "Cold Street",
      },
    },
  };

  describe("#toCamelCase", () => {
    test("should transform keys into camel-case", () => {
      const value = ObjectHelpers.toCamelCase<Person>(snakeCase);
      expect(value).toStrictEqual(camelCase);
    });
    test("should return null", () => {
      expect(ObjectHelpers.toCamelCase(null)).toEqual(null);
    });
    test("should return undefined", () => {
      expect(ObjectHelpers.toCamelCase(undefined)).toEqual(undefined);
    });
  });

  describe("#toSnakeCase", () => {
    test("should transform keys into snakeCase", () => {
      const value = ObjectHelpers.toSnakeCase(camelCase);
      expect(value).toStrictEqual(snakeCase);
    });
    test("should return null", () => {
      expect(ObjectHelpers.toSnakeCase(null)).toEqual(null);
    });
    test("should return undefined", () => {
      expect(ObjectHelpers.toSnakeCase(undefined)).toEqual(undefined);
    });
    test("should return FormData original value", () => {
      const value = new FormData();
      expect(ObjectHelpers.toSnakeCase(value)).toEqual(value);
    });
  });
});
