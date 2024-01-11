import { dateToNumber } from "@/utilsFn/formatDate";
import { numberToDate } from "@/utilsFn/formatDate";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Action } from "../HistoricalDataChart";

type Props = {
  startDate: number;
  endDate: number;
  dispatch: React.Dispatch<Action>;
  firstDate: number;
  lastDate: number;
};
const DateRangeSelector = ({
  startDate,
  endDate,
  dispatch,
  firstDate,
  lastDate,
}: Props) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <DatePicker
        selected={numberToDate(startDate)}
        onChange={(date) =>
          dispatch({ type: "SET_START_DATE", payload: dateToNumber(date!) })
        }
        dateFormat="yyyy/MM/dd"
        showDisabledMonthNavigation
        minDate={numberToDate(firstDate)}
        maxDate={numberToDate(endDate)}
      />
      To
      <DatePicker
        selected={numberToDate(endDate)}
        onChange={(date) =>
          dispatch({ type: "SET_END_DATE", payload: dateToNumber(date!) })
        }
        dateFormat="yyyy/MM/dd"
        showDisabledMonthNavigation
        minDate={numberToDate(startDate)}
        maxDate={numberToDate(lastDate)}
      />
    </div>
  );
};

export default DateRangeSelector;
