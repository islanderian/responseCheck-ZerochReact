import React, { Component } from "react";
import "./ResponseCheck.css";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout; // 성급하게 클릭했을 때 타임아웃을 종료하기 위한 변수
  startTime; // 색이 변한 시점을 저장하는 변수
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요.",
      });

      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭!",
        });
        this.startTime = new Date(); // 초록색 변한 시점
      }, Math.floor(Math.random() * 1000 + 2000)); // 2~3 초 사이의 랜덤 값
    } else if (state === "ready") {
      // 성급하게 클릭
      clearTimeout(this.timeout); // 타임아웃 빠져나가기
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요.",
      });
    } else if (state === "now") {
      // 사용자가 초록색 된 이후 클릭하면 반응속도 체크
      this.endTime = new Date(); // 초록색 변한 이후 클릭한 시점
      this.setState((prev) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요.",
          result: [...prev.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      state: "waiting",
      message: "클릭해서 시작하세요.",
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균시간 :{result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
