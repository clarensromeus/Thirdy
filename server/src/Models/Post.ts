import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./User.ts";
import { Like } from "./Likes.ts";
import { Share } from "./Shared.ts";
import { Retweeted } from "./Retweeted.ts";
import { Comments } from "./Comments.ts";
// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "posts", timestamps: true } })
export class Post {
  @prop({ type: () => String, required: true })
  public PostId!: string;

  @prop({ type: () => String, required: false })
  public PostImage?: string;

  @prop({ type: () => String, required: false })
  public PublicId?: string;

  @prop({ type: () => String, required: false })
  Title?: string;

  @prop({ ref: () => User, required: false })
  public User?: Ref<User>;

  @prop({ type: () => String, required: true })
  public PostReference!: string;

  @prop({ type: () => Boolean, required: true, default: false })
  public isRetweeted!: boolean;

  @prop({ ref: () => Retweeted, required: false })
  public RetweetedRating?: Ref<Retweeted>[];

  @prop({ ref: () => Comments, required: false })
  public Comments?: Ref<Comments>[];

  @prop({ ref: () => Like, required: false })
  public Likes?: Ref<Like>[];

  @prop({ ref: () => Share, required: false })
  public SharedRating?: Ref<Share>[];
}
