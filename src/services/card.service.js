import { CardModel } from "../models/card.model.js";
import { ColumnModel } from "../models/column.model.js";

const createNew = async (data) => {
   try {
      const createdCard = await CardModel.createNew(data);
      const getNewCard = await CardModel.findOneById(
         createdCard.insertedId.toString()
      );

      /* Update columnOrder Array in board collection */
      await ColumnModel.pushCardOrder(
         getNewCard.columnId.toString(),
         getNewCard._id.toString()
      );
      return getNewCard;
   } catch (error) {
      throw new Error(error);
   }
};

const update = async (id, data) => {
   try {
      const updateData = {
         ...data,
         updatedAt: Date.now(),
      };
      if (updateData._id) delete updateData._id;
      const updatedCard = await CardModel.update(id, updateData);

      return updatedCard;
   } catch (error) {
      throw new Error(error);
   }
};

export const CardService = { createNew, update };
