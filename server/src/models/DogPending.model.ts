import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
} from "sequelize-typescript";
import UserModel from "./User.model";

@Table({
  timestamps: false,
  tableName: "DogsPending",
})
class DogPendingModel extends Model {
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
  weight!: `${number} | ${number} - ${number}`;

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
}

export default DogPendingModel;
