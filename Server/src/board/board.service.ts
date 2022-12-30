import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from './board.schema';
import { Model } from 'mongoose';
import { BoardDto } from './board.dto';
import successResponse, { BoardSearchable } from '../common/common';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    private config: ConfigService,
  ) {}

  async getBoard(boardName: string) {
    try {
      if (boardName) {
        const result = await this.searchBoardExternal(boardName);
        return { message: result };
      } else {
        return { message: 'Board name is required' };
      }
    } catch (e) {
      return { message: 'Internal error' };
    }
  }

  async createBoard(@Res() response, dto: BoardDto) {
    try {
      const board = await this.boardModel.create({
        ...dto,
        timestamp: new Date(),
      });
      return successResponse({
        response: response,
        data: {
          name: board.name,
          state: board.state,
        },
        code: HttpStatus.CREATED,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Catastrophic error occurred' });
    }
  }

  async searchBoard(@Res() response, search: BoardSearchable) {
    try {
      const query = this.boardQuery(search);
      const result = await this.boardModel.find(query);
      return successResponse({
        response: response,
        data: result,
        code: HttpStatus.OK,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Catastrophic error occurred' });
    }
  }

  private boardQuery(search: BoardSearchable) {
    const { id, name, state, startDate, endDate } = search;
    const query = {};
    for (const searchKey in search) {
      query[searchKey] = search[searchKey];
    }

    if (name) {
      query['name'] = { $regex: name, $options: 'i' };
    }

    if (startDate || endDate) {
      query['timestamp'] = {};
      if (startDate) {
        query['timestamp']['$gte'] = new Date(startDate);
      }
      if (endDate) {
        query['timestamp']['$lte'] = new Date(endDate);
      }
    }
    return query;
  }

  async searchBoardExternal(boardName: string) {
    const response = await axios.post(
      'https://api.monday.com/v2',
      {
        query: 'query { boards  { name state id}}',
      },
      {
        headers: {
          Authorization: this.config.get('MONDAY_API_KEY'),
          'Content-Type': 'application/json',
        },
      },
    );

    const board = response.data.data.boards.filter((board) =>
      board.name.toLowerCase().includes(boardName.toLowerCase()),
    );

    if (board) {
      return board;
    } else {
      return 'Not Found';
    }
  }
}
