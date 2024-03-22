import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  AutoIncrement,
  BeforeDestroy,
} from "sequelize-typescript";
import UserModel from "./User.model";
import LikesModel from "./Likes.model";
// import LikesModel from "./Likes.model";

@Table({
  timestamps: false,
  tableName: "Dogs",
})
class DogModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  height!: `${number}` | `${number} - ${number}`;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weight!: `${number}` | `${number} - ${number}`;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lifeSpan!: `${number} years` | `${number} - ${number} years`;

  @Column({
    type: DataType.STRING,
  })
  breedGroup!:
    | "Toy"
    | "Hound"
    | "Unknown"
    | "Terrier"
    | "Working"
    | "Mixed"
    | "Non-Sporting"
    | "Sporting"
    | "Herding";

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  temperaments!: string[];

  @ForeignKey(() => UserModel)
  userId!: string;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @BelongsToMany(() => UserModel, () => LikesModel)
  likes!: UserModel[];

  @BeforeDestroy
  static async deleteRelation (dog: DogModel) {
    await LikesModel.destroy({
      where: {
        dogId: dog.id
      }
    })
  }
}

export default DogModel;
