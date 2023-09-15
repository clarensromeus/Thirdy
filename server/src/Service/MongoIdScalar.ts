import { GraphQLScalarType, Kind } from "graphql";
import { isValidObjectId } from "mongoose";

const MongoId = new GraphQLScalarType({
  name: "_id",
  description: "objectid custom scalar type",
  serialize(value) {
    if (isValidObjectId(value)) {
      return value as string; // if value is from object ObjectId type cast it into string
    }
    throw Error("value type is incorrect");
  },
  parseValue(value) {
    if (typeof value === "string") {
      return value; // return value output if it is a string
    }
    throw new Error("GraphQL string Scalar parser expected a string");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      ast.value.toString();
    }
    // Invalid hard-coded value (not a string)
    return null;
  },
});

export default MongoId;
