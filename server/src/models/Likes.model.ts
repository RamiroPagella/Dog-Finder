import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import DogModel from "./Dog.model";
import UserModel from "./User.model";

@Table({
  timestamps: false,
  tableName: 'Likes'
})
class LikeModel extends Model {
  @ForeignKey(() => UserModel)
  @Column
  userId!: string ;

  @ForeignKey(() => DogModel)
  @Column
  dogId!: number;
}

export default LikeModel;