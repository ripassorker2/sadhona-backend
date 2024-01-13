import { Schema, model } from 'mongoose';
import { IJobs, JobModel } from './job.interface';

const jobSchema = new Schema<IJobs, JobModel>(
   {
      category: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      location: {
         type: String,
         required: true,
      },
      level: {
         type: String,
         required: true,
      },
      daliveryTime: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         default: 'pending',
      },
      requireSkills: [],
      user: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   }
);

export const Job = model<IJobs, JobModel>('Job', jobSchema);
