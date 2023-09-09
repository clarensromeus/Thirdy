import { faker } from "@faker-js/faker";

interface User<S> {
  Firstname: S;
  Lastname: S;
  Email: S;
  Image: S;
  Password: S;
  Sex: S;
  DOB: S;
  Bio?: S;
}

// create random user
export const RandomUser = async (): Promise<User<string>> => {
  try {
    const result = {
      Firstname: faker.person.firstName(),
      Lastname: faker.person.lastName(),
      Email: faker.internet.email(),
      Password: faker.internet.password({
        length: 20,
        memorable: true,
        pattern:
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      }),
      Sex: faker.person.sexType(),
      Image: faker.internet.avatar(),
      DOB: faker.date.birthdate().toString(),
      Bio: faker.lorem.sentence(),
    };
    return await result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
