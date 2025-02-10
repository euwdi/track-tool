import { FC } from "react";
import classes from "./style.module.scss";

type TProps = {
  headers: string[];
  data: string[][];
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

        {data.map((trData) => (
          <tr>
            {trData.map((tdData) => (
              <td className={classes.tableCell}>{tdData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
