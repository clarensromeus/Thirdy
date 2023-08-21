import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { GraphQLError } from "graphql";
// externally crafted imports of ressources
import { Iauth } from "../typings/Auth";

function isAuthDirective(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (upperDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (
          source,
          args,
          context: Iauth,
          info
        ) {
          const result = await resolve(source, args, context, info);
          if (context.isAuth) {
            return result;
          } else {
            new GraphQLError("user must be authenticated", {
              extensions: {
                code: "UNAUTHENTICATED",
                statusCode: 503,
              },
            });
          }
        };
        return fieldConfig;
      }
    },
  });
}

export default isAuthDirective;
