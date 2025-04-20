import { FC } from "react";
import classes from "./style.module.scss";

type TProps = {
  headers: string[];
  data: {
    fields: string[][];
    onClickMove?: () => void;
    onClick?: () => void;
  }[];
  isEditable?: boolean;
};

const Table: FC<TProps> = ({ headers, data }) => {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          {headers.map((header) => (
            <th className={classes.tableHeaderCell}>{header}</th>
          ))}
        </tr>

        {data.map((trData, index) => (
          <tr
            onClick={trData.onClick}
            className={trData.onClick && classes.clickableRow}
          >
            {trData.fields.map((tdData) => (
              <td
                className={`${classes.tableCell} ${
                  index % 2 === 1 ? classes.gray : classes.white
                }`}
              >
                {tdData}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
