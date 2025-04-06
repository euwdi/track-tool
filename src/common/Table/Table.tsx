import { FC } from "react";
import classes from "./style.module.scss";
import ArrowIcon from "@/assets/arrow.svg?react";
import { Button } from "../Button/Button";

type TProps = {
  headers: string[];
  data: { fields: string[][]; onClickMove?: () => void }[];
  isEditable?: boolean;
  isOpenable?: boolean;
  isMoveble?: boolean;
};

const Table: FC<TProps> = ({ headers, data, isMoveble }) => {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          {headers.map((header) => (
            <th className={classes.tableHeaderCell}>{header}</th>
          ))}
          {isMoveble && <th className={classes.tableHeaderCell}></th>}
        </tr>

        {data.map((trData, index) => (
          <tr>
            {trData.fields.map((tdData) => (
              <td
                className={`${classes.tableCell} ${
                  index % 2 === 1 ? classes.gray : classes.white
                }`}
              >
                {tdData}
              </td>
            ))}
            {isMoveble && trData.onClickMove && (
              <td
                className={`${classes.tableCell} ${
                  index % 2 === 1 ? classes.gray : classes.white
                }`}
              >
                <Button onClick={trData.onClickMove}>
                  <ArrowIcon />
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
