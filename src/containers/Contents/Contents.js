import React from 'react'
import './Contents.css';
import Button from '../../components/Button/Button';

class Contents extends React.Component {
    state = {
        isRecording: false,
        Start_Recognition: false,
    }

    btnclickHandler = () => {
        // 회의시작 버튼의 이벤트 핸들러입니다. 
        this.setState({isRecording: !this.state.isRecording});
    }

    Start_Recognition = () => {
        // 여기서 Web Speech API 사용해야합니다.

    }

    render() {
        // recording_state는 버튼 span의 색깔 변경에 필요합니다.
        let recording_state = this.state.isRecording ? "recording-state recording" : "recording-state"; 

        if(this.state.isRecording) { //만약 isRecording이 true이면 Web speech API 호출을 시작해야합니다.
            this.Start_Recognition()
        }
        return (
            <div className="contents">
                <p>일단 Speech Recognition해서 텍스트만 번역한 상태입니다. 추후에 이 텍스트를 어떠한 기준으로 랜더링할지 결정해야합니다. </p>
                <section className="wrapper">
                    <div className="result">
                        <p>회의를 하시다보면 키웓</p>
                    </div>
                    <Button clicked={this.btnclickHandler} btnType="mic"> 회의 시작 
                        <span class={recording_state}></span> 
                    </Button>
                    
                </section>
            </div>
        )
    }
}
export default Contents;