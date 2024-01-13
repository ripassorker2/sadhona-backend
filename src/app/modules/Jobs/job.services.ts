import { ObjectId, SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { jobsSearchableFields } from './job.constant';
import { IJobs, IJobsFilters } from './job.interface';
import { Job } from './job.model';

const createJob = async (
   job: IJobs,
   userId: ObjectId
): Promise<IJobs | null> => {
   job.user = userId;
   const result = await Job.create(job);
   return result;
};

const getAllJobs = async (
   filters: IJobsFilters,
   paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IJobs[]>> => {
   //.............pagiantions..............
   const { limit, page, skip, sortOrder, sortBy } =
      paginationHelper.paginationCalculate(paginationOptions);

   // ............sorting.................
   const sortCondition: { [key: string]: SortOrder } = {};
   if (sortOrder && sortBy) {
      sortCondition[sortBy] = sortOrder;
   }

   const { searchTerm, ...filtersData } = filters;

   const andConditions = [];
   //.................searching ...................
   if (searchTerm) {
      andConditions.push({
         $or: jobsSearchableFields.map(feild => ({
            [feild]: {
               $regex: searchTerm,
               $options: 'i',
            },
         })),
      });
   }

   //.................filtering ...................
   if (Object.keys(filtersData).length) {
      andConditions.push({
         $and: Object.entries(filtersData).map(([field, value]) => ({
            [field]: value,
         })),
      });
   }
   const whereConditons =
      andConditions.length > 0 ? { $and: andConditions } : {};

   const result = await Job.find(whereConditons)
      .populate('user')
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
   const total = await Job.countDocuments(whereConditons);

   return {
      meta: {
         page,
         limit,
         total,
      },
      data: result,
   };
};

const getSingleJob = async (id: string): Promise<IJobs | null> => {
   const result = await Job.findById(id)
      .populate({ path: 'user', options: { strictPopulate: false } })
      .exec();
   return result;
};

export const JobServices = {
   createJob,
   getAllJobs,
   getSingleJob,
};
