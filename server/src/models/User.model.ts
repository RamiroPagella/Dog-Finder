import { Table, Model, Column, PrimaryKey, DataType, HasMany, BelongsToMany } from "sequelize-typescript";
import DogModel from "./Dog.model";
import LikesModel from "./Likes.model";

@Table({
  timestamps: false,
  tableName: 'Users'
})
class UserModel extends Model {
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
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  admin!: boolean;

  @HasMany(() => DogModel)
  dogs!: DogModel[]

  @BelongsToMany(() => DogModel, () => LikesModel)
  likes!: DogModel[]
}

export default UserModel;