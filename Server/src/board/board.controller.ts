import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './board.dto';
import { BoardSearchable } from '../common/common';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getBoard(@Req() request) {
    const { name } = request.query;
    return await this.boardService.getBoard(name);
  }

  @Post('new')
  async createBoard(@Res() response, @Body() dto: BoardDto) {
    return await this.boardService.createBoard(response, dto);
  }

  @Post('search')
  async searchBoard(@Res() response, @Body() search: BoardSearchable) {
    console.log(search);
    return await this.boardService.searchBoard(response, search);
  }
}
