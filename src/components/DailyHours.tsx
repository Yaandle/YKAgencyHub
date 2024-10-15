import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { format } from 'date-fns';

interface DailyHoursProps {
  selectedDate: Date;
}

const DailyHours: React.FC<DailyHoursProps> = ({ selectedDate }) => {
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  const jobs = useQuery(api.jobs.getJobsForDate, { date: formattedDate });

  return (
    <div className="daily-hours">
      <h3 className="text-lg font-semibold mb-2">Jobs for {format(selectedDate, 'MMMM d, yyyy')}</h3>
      {jobs ? (
        jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} className="mb-2">
                <strong>{job.title}</strong>
                <br />
                {format(new Date(job.startDate), 'h:mm a')} - {format(new Date(job.startDate + job.hours * 3600000), 'h:mm a')}
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs scheduled for this date.</p>
        )
      ) : (
        <p>Loading jobs...</p>
      )}
    </div>
  );
};

export default DailyHours;
