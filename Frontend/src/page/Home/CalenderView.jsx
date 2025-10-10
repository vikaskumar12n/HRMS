import { useState } from "react";
import {
  Calendar,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";

const CalendarView = ({ attendanceData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = getDay(new Date(year, month, 1)); // Sunday = 0
  const emptyCells = (startDay + 6) % 7; // Shift to make Monday = 0

  const monthData = attendanceData.find(
    (m) =>
      new Date(m.days[0]?.date).getMonth() === month && m.year === year
  );

  return (
    <div className="lg:col-span-4">
      <div className="bg-white rounded-lg shadow h-full">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Monthly Attendance</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate((prev) => subMonths(prev, 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <button
              onClick={() => setCurrentDate((prev) => addMonths(prev, 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <div className="grid grid-cols-7 gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div
                  key={i}
                  className="text-center text-xs font-medium text-gray-500 p-1"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells to align the first day */}
              {Array.from({ length: emptyCells }).map((_, i) => (
                <div key={`empty-${i}`} className="p-1"></div>
              ))}

              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayData = monthData?.days.find((d) => d.day === day);

                let bgColor = "bg-gray-100";
                let textColor = "text-gray-400";
                let icon = null;

                if (dayData) {
                  if (dayData.status === "present") {
                    bgColor = "bg-green-300";
                    textColor = "text-green-800";
                    icon = <Check size={12} className="mx-auto text-green-600" />;
                  } else if (dayData.status === "absent") {
                    bgColor = "bg-red-300";
                    textColor = "text-red-800";
                    icon = <X size={12} className="mx-auto text-red-600" />;
                  } else if (dayData.status === "leave") {
                    bgColor = "bg-yellow-100";
                    textColor = "text-yellow-800";
                    icon = (
                      <CalendarIcon
                        size={12}
                        className="mx-auto text-yellow-600"
                      />
                    );
                  }
                }

                return (
                  <div
                    key={day}
                    className={`rounded p-1 text-center ${bgColor}`}
                  >
                    <div className={`text-xs font-medium ${textColor}`}>
                      {day}
                    </div>
                    {icon}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 pt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-300 rounded mr-1"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-300 rounded mr-1"></div>
              <span>Absent</span>
            </div>
            {/* <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-100 rounded mr-1"></div>
              <span>Leave</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
