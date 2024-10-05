import { CollectionConfig } from 'payload/types';
import TimeRangeSlider from '../admin/components/TimeRangeSlider';

const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        const errors: { [key: string]: string } = {};

        console.log('Employee data:', JSON.stringify(data, null, 2));

        // Validate work schedule
        if (data.workSchedule && Array.isArray(data.workSchedule)) {
          data.workSchedule.forEach((schedule, index) => {
            if (!schedule.day) {
              errors[`workSchedule.${index}.day`] = `Work schedule item ${index + 1} is missing a day.`;
            }
            if (!schedule.timeRange) {
              errors[`workSchedule.${index}.timeRange`] = `Work schedule item ${index + 1} is missing time range.`;
            } else if (typeof schedule.timeRange.startTime !== 'number' || typeof schedule.timeRange.endTime !== 'number') {
              errors[`workSchedule.${index}.timeRange`] = `Work schedule item ${index + 1} has invalid time range. Both start and end times must be numbers.`;
            } else if (schedule.timeRange.startTime >= schedule.timeRange.endTime) {
              errors[`workSchedule.${index}.timeRange`] = `Work schedule item ${index + 1} has invalid time range: start time (${schedule.timeRange.startTime}) must be before end time (${schedule.timeRange.endTime}).`;
            }
          });
        } else {
          errors.workSchedule = 'Work schedule is required and must be an array.';
        }

        // Validate phone number (basic check)
        if (data.phone && !/^\+?[\d\s-()]+$/.test(data.phone)) {
          errors.phone = 'Invalid phone number format.';
        }

        // Validate salary
        if (typeof data.salary !== 'number' || data.salary < 0) {
          errors.salary = 'Salary must be a positive number.';
        }

        if (Object.keys(errors).length > 0) {
          console.log('Validation errors:', errors);
          return Promise.reject(errors);
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'workSchedule',
      type: 'array',
      label: 'Work Schedule',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'select',
          options: [
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
            { label: 'Sunday', value: 'sunday' },
          ],
          required: true,
        },
        {
          name: 'timeRange',
          type: 'group',
          fields: [
            {
              name: 'startTime',
              type: 'number',
              required: true,
              min: 0,
              max: 24,
            },
            {
              name: 'endTime',
              type: 'number',
              required: true,
              min: 0,
              max: 24,
            },
          ],
          admin: {
            components: {
              Field: TimeRangeSlider,
            },
          },
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'salary',
      type: 'number',
      required: true,
      min: 0,
    },
  ],
};

export default Employees;