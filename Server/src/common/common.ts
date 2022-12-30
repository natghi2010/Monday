function successResponse({
  response,
  data,
  code = 200,
  message = 'Successfully completed operation',
}: {
  response: any;
  data: any;
  code?: number;
  message?: string;
}): any {
  return response.status(code).json({
    message,
    data,
  });
}

export class BoardSearchable {
  id?: string;
  name?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
}

export default successResponse;
