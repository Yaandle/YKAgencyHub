import React, { useState, useEffect, useMemo } from "react";
import { Calendar } from "@nextui-org/calendar";
import { CalendarDate, DateValue, today, getLocalTimeZone } from '@internationalized/date';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface CalendarSystemProps {
  selectedDate: DateValue;
  onDateSelect: (date: DateValue) => void;
}

export default function CalendarSystem({ selectedDate, onDateSelect }: CalendarSystemProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const jobs = useQuery(api.calendar.getMonthlyJobs, currentMonth);

  const handleDateChange = (date: DateValue) => {
    onDateSelect(date);

    if (date.month !== currentMonth.month || date.year !== currentMonth.year) {
      setCurrentMonth({ year: date.year, month: date.month });
    }
  };

  const jobDates = useMemo(() => {
    if (!jobs) return new Set<string>();
    
    const dates = new Set<string>();
    jobs.forEach(job => {
      let currentDate = new Date(job.startDate);
      const endDate = new Date(job.endDate);
      
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        dates.add(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    return dates;
  }, [jobs]);

  useEffect(() => {
    const style = document.createElement('style');
    const cssRules = `
      .nextui-calendar-days button {
        color: black !important;
      }
      ${Array.from(jobDates).map(date => {
        const [year, month, day] = date.split('-');
        return `
          .nextui-calendar-days [aria-label="${month}/${day}/${year}"],
          .nextui-calendar-days [aria-label="${date}"] { 
            background-color: #e6f2ff !important; 
            border-radius: 50%; 
          }
        `;
      }).join('\n')}
    `;

    style.textContent = cssRules;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [jobDates]);

  return (
    <div className="w-full">
      <Calendar 
        aria-label="Job Schedule Calendar" 
        value={selectedDate}
        onChange={handleDateChange}
        defaultValue={today(getLocalTimeZone())}
        visibleMonths={1}
        showMonthAndYearPickers={true}
        classNames={{
          base: "job-calendar w-full",
          cell: "job-calendar-cell",
          cellButton: "job-calendar-cell-button",
        }}
      />
    </div>
  );
}
