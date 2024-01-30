import Dog from "../models/Dog.model"
import { DogType } from "../types/dog.types"
import { Op } from "sequelize"

export const dogByName = async (name: string): Promise<DogType | null> => {
  
  const dogFound: DogType | null = await Dog.findOne({
    where: {
      name: {
        [Op.iLike]: name
      }
    }
  })
  return dogFound;
}

