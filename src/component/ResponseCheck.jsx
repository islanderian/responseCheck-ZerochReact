import React, { useRef, useState } from "react";
import "./ResponseCheck.css";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);

  const timeout = useRef(null); // 값이 바뀌어도 렌더링하고 싶지 않을 때에는 useRef 를 사용!
  const startTime = useRef();
  const endTime = useRef();

  const onReset = () => {
    setState("waiting");
    setMessage("클릭해서 시작하세요.");
    setResult([]);
  };

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");

      // useRef를 사용하면 변수 뒤에 .current 를 붙여주어야 함
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭!");
        startTime.current = new Date(); // 초록색 변한 시점
      }, Math.floor(Math.random() * 1000 + 2000)); // 2~3 초 사이의 랜덤 값
    } else if (state === "ready") {
      // 성급하게 클릭
      clearTimeout(timeout.current); // 타임아웃 빠져나가기
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      // 사용자가 초록색 된 이후 클릭하면 반응속도 체크
      endTime.current = new Date(); // 초록색 변한 이후 클릭한 시점
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult((prev) => {
        return [...prev, endTime.current - startTime.current];
      });
    }
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균시간 :{result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
