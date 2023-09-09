import { fileURLToPath } from "url";
import { dirname } from "path";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { nanoid } from "nanoid";
// internally crafted imports of ressources
import { statusModel } from "../../Models";
import { Resolvers } from "../../__generate__/types";
import UploadFile from "../../Service/ImageUpload";
import { ImageType } from "../../typings/upload";
import MongoId from "../../Service/Scalar";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const UserStatus: Resolvers = {
  // This maps the Upload scalar to the implementation provided
  // by the graphql-upload package.
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Query: {}, // left to do
  Mutation: {
    AddStatus: async (__, { _id, picture, userId }) => {
      try {
        const { secureUrl, public_id }: ImageType<string> = await UploadFile(
          picture,
          true,
          __dirname,
          "Thirdy_social"
        );

        const isStatusExist = await statusModel.findOne({ _id }).select("User");

        if (isStatusExist) {
          // update user status images if already created
          await statusModel
            .findOneAndUpdate({
              $push: {
                StatusImages: {
                  StatusId: `status_${nanoid()}`,
                  public_id: public_id ?? "",
                  Image: secureUrl,
                },
              },
            })
            .where({ _id });

          return {
            message: "new status added with success",
            success: true,
          };
        }
        // create user status images if not already created
        await statusModel.create({
          User: userId,
          $push: {
            StatusImages: {
              StatusId: `status_${nanoid()}`,
              public_id: public_id ?? "",
              Image: secureUrl,
            },
          },
        });

        return {
          message: "status created with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    DeleteStatusImage: async (__, { StatusId, userId }) => {
      try {
        const isDeleted = await statusModel
          .findOneAndDelete({ $pull: { StatusImages: { StatusId } } })
          .where({ User: userId });
        // delete specific user image from list of status images
        if (isDeleted) {
          return {
            message: "status deleted with success",
            success: true,
          };
        }
        return {
          message: "status not deleted",
          success: false,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};
