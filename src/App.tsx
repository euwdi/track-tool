import "./App.css";
import { Input } from "./common/Input/Input";
import { Button } from "./common/Button/Button";
import { FlexColumn } from "./common/ui/FlexColumn/FlexColumn";

function App() {
  return (
    <>
      <FlexColumn>
        <Input />
        <Button />
      </FlexColumn>
      <FlexColumn verticalCenter>
        <Input />
        <Button />
      </FlexColumn>
    </>
  );
}

export default App;
