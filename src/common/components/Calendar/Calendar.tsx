import { Calendar as Ass } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps {
  value: Date;
  onChange: (value: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  return (
    <Ass
      value={value}
      onChange={(value, event) => {
        onChange(new Date(value!.toString()));
      }}
    ></Ass>
  );
};

export default Calendar;
