import { Table, Model, Column, PrimaryKey, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: 'User'
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

}

export default UserModel;