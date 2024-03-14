import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import UserModel from "./User.model";

@Table({
  timestamps: false,
  tableName: "DogsPending",
})
class DogPendingModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

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
}

export default DogPendingModel;
