import {
  uniqueNamesGenerator,
  names,
  colors,
  languages,
} from "unique-names-generator";

const randomName: string = uniqueNamesGenerator({
  dictionaries: [names, colors, languages],
}); // generate random and unique names

export default randomName;
