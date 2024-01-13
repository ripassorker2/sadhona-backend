import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFeilds } from '../../../constant/PaginationOptions';
import { IGenericResposnse } from '../../../interface/common';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { jobsFilterableFields } from './job.constant';
import { IJobs } from './job.interface';
import { JobServices } from './job.services';

const createJob = catchAsync(async (req: Request, res: Response) => {
   const result = await JobServices.createJob(req.body, req.user?.id);

   sendResponse<IJobs>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Created job successfully..!!',
      data: result,
   });
});
const getAllJob = catchAsync(async (req: Request, res: Response) => {
   const filters = pick(req.query, jobsFilterableFields);
   const paginationOptions = pick(req.query, paginationFeilds);

   const result = await JobServices.getAllJobs(filters, paginationOptions);

   sendResponse<IGenericResposnse<IJobs[]>>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'All job retrive successfully..!!',
      meta: result.meta,
      data: result,
   });
});
const getSingleJob = catchAsync(async (req: Request, res: Response) => {
   const result = await JobServices.getSingleJob(req.params.id);

   sendResponse<IJobs>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Retrive job successfully..!!',
      data: result,
   });
});

export const JobController = {
   createJob,
   getAllJob,
   getSingleJob,
};
