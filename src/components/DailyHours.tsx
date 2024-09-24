import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

interface DailyHoursProps {
  selectedDate: Date | null;
}

const DailyHours: React.FC<DailyHoursProps> = ({ selectedDate }) => {
  const startDate = selectedDate ? selectedDate.getTime() : Date.now();
  const endDate = startDate + 86400000; // Add 24 hours

  const dailyHours = useQuery(api.dailyHours.getDailyHoursSummary, {
    startDate,
    endDate,
  });

  const jobs = useQuery(api.jobs.listJobs);

  if (dailyHours === undefined || jobs === undefined) return <div>Loading...</div>;

  const jobMap = new Map(jobs.map(job => [job._id, job.title]));

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Daily Hours</h2>
      {Object.entries(dailyHours).map(([date, data]) => (
        <div key={date} className="mb-4">
          <h3 className="text-lg font-medium">{new Date(date).toLocaleDateString()}</h3>
          <p>Total Hours: {data.totalHours}</p>
          <ul>
            {Object.entries(data.jobs).map(([jobId, hours]) => (
              <li key={jobId}>
                {jobMap.get(jobId as Id<"jobs">) || 'Unknown Job'}: {hours} hours
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DailyHours;