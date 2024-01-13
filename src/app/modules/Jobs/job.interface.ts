import { Model, ObjectId } from 'mongoose';
export type IJobs = {
   category: string;
   title: string;
   price: number;
   description: string;
   location: string;
   level: string;
   daliveryTime: number;
   status: string;
   requireSkills: [];
   user: ObjectId;
};
export type JobModel = Model<IJobs, Record<string, unknown>>;

export type IJobsFilters = {
   searchTerm?: string;
   category?: string;
   title?: string;
   location?: string;
};
