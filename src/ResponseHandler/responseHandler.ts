/**
 * Here the file you handle the
 * response and send back then json
 * to the cilent
 *
 * @author meganathan
 *
 */

import { Response } from 'express';

type ResponseOption = {
  status: number;
  message: string;
  data?: any;
};

// For global send the response
export const sendResponse = (res: Response, options: ResponseOption) => {
  // Desctruct the option
  const { status = 200, message, data = [] } = options;

  return res.status(status).json({
    status,
    message,
    data,
  });
};
