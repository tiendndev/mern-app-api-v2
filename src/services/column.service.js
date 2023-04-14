import { ColumnModel } from "../models/column.model.js";
import { BoardModel } from "../models/board.model..js";
import { CardModel } from "../models/card.model.js";

const createNew = async (data) => {
   try {
      /* transaction mongodb */
      const createdColumn = await ColumnModel.createNew(data);
      const getNewColumn = await ColumnModel.findOneById(
         createdColumn.insertedId.toString()
      );
      getNewColumn.cards = [];

      /* Update columnOrder Array in board collection */
      await BoardModel.pushColumnOrder(
         getNewColumn.boardId.toString(),
         getNewColumn._id.toString()
      );

      return getNewColumn;
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
      if (updateData.cards) delete updateData.cards;

      const updatedColumn = await ColumnModel.update(id, updateData);

      if (updatedColumn._destroy) {
         /* Delete many cards in this Column */
         CardModel.deleteMany(updatedColumn.cardOrder);
      }

      return updatedColumn;
   } catch (error) {
      throw new Error(error);
   }
};

export const ColumnService = { createNew, update };
