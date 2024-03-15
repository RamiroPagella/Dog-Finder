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
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
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
  height!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weight!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lifeSpan!: string;

  @Column({
    type: DataType.STRING,
  })
  breedGroup!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  temperaments!: string[]

  @ForeignKey(() => UserModel)
  userId!: string

  @BelongsTo(() => UserModel)
  user!: UserModel

  @BelongsToMany(() => UserModel, () => LikesModel)
  likes!: UserModel[]
}

export default DogModel;
