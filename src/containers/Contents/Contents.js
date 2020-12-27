import React from 'react'
import './Contents.css';
import Button from '../../components/Button/Button';

// const register_finalTranscript = () => { // 화면에 표시된 result값들을 React state에 저장한다.
//     console.log('fired!');
//     const final_span = document.querySelector('#final_span');
//     const data = final_span.innerHTML;
//     this.setState({finalTranscript: data});
// }

class Contents extends React.Component {
    state = {
        isRecording: false,
        NumOfBall: 0,
        recognitionObject: null, //componentDidmount에서 등록할 recognition 객체
        ignoreEndProcess: false,
        hasError: false,
        finalTranscript: '',
        interimTranscript: '',
    }

    componentDidMount() { //recognition 객체 생성하고 이벤트 핸들러를 정의한다.
        this.recognitionObjectInit();
    }

    MeetingBtnclickHandler = () => {
        // 회의시작 버튼의 이벤트 핸들러입니다. 
        let past_state_isRecording = this.state.isRecording;
        if(past_state_isRecording) { //current_state_isrecording과 반대 상태이다. (아직 업데이트 전)
            this.state.recognitionObject.stop();
        }else {
            this.Start_Recognition();
        }
        this.setState({isRecording: !past_state_isRecording});
        
    }
    RemoveBtnclickHandler = () => {
        const final_span = document.querySelector('#final_span');
        final_span.innerHTML = ''; 
    }

    SpanClickHandler = (id) => {
        console.log("my id : ", id);
    }

    recognitionObjectInit = async () => {
        if(typeof webkitSpeechRecognition !== 'function') {
            alert('Meeting Helper는 크롬에서만 가능합니다.')
            return null;
        }
        // 객체 초기화
        const recognition = new window.webkitSpeechRecognition(); // Web API인 SpeechRecognition 객체 생성.
        const language = 'ko-KR';

        recognition.lang = language; 
        recognition.interimResults = true; 
        recognition.continuous = true;
        
        let ignoreEndProcess = false;
        
        /**
         * 음성 인식 시작 처리
         */
        recognition.onstart = (event) => { // onstart 이벤트 핸들러를 정의한다.
            console.log('onstart', event);
        }

        /**
         * 음성 인식 종료 처리
         */
        let state_finalTranscript = this.state.finalTranscript;
        recognition.onend = function () {
            console.log('onend', arguments);
            recognition.stop();
            
            if (ignoreEndProcess) {
              return false;
            }
        
            // Do end process
            if (!state_finalTranscript) {
              console.log('empty finalTranscript');
              return false;
            }
          };

         /**
         * 음성 인식 결과 처리
         */
        
        recognition.onresult = function (event) {
            console.log('onresult', event);
        
            let interimTranscript = '';
            let finalTranscript = '';
            const final_span = document.querySelector('#final_span');
            const interim_span = document.querySelector('#interim_span');

            if (typeof event.results === 'undefined') {
                recognition.onend = null;
                recognition.stop();
                return;
            }
        
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript;
        
                if (event.results[i].isFinal) {
                finalTranscript += transcript;
                } else {
                interimTranscript += transcript;
                }
            }
            
            let htmlEl = null;
            if(finalTranscript) {
                let final_arr = finalTranscript;
                final_arr.forEach((value, index) => {
                if(index === 0) {
                    htmlEl = `<span class="resultWord" id=0>` + value + '<span/>';
                }else {
                    htmlEl = htmlEl + `<span class="resultWord" id=${index}>${value}<span/> ` 
                }
            })}

            console.log('htmlEl : ' + htmlEl);
            final_span.innerHTML = htmlEl;
            interim_span.innerHTML = interimTranscript;

            console.log('finalTranscript', finalTranscript);
            console.log('interimTranscript', interimTranscript);
            // fireCommand(interimTranscript);
        };
        
        /**
        * 음성 인식 에러 처리
        */
        recognition.onerror = function (event) {
            console.log('onerror', event);

            if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
              ignoreEndProcess = true;
            }
        
            alert('There is an ' + event.error + ' error.' + "\nPlease simply refresh this page.");
        };
        
        // 최종 객체 등록.
        this.setState({recognitionObject: recognition})
    }

    Start_Recognition = async () => {
        // 여기서 Web Speech API 사용해야합니다.
        if(this.state.recognitionObject) { //componentdidmount에 의해서 최초에 회의 시작 버튼을 눌렀을 때, 이 조건식에 해당한다.
            this.state.recognitionObject.start();
        }else {
            await this.recognitionObjectInit(); //여기서 recognition 객체의 이벤트 핸들러 설정까지 전부 진행된 후에 start() 해야하므로 await 해준다.
            this.state.recognitionObject.start();
        }
    }
    
    render() {
        // recording_state는 버튼 span의 색깔 변경에 필요합니다.
        let recording_state = this.state.isRecording ? "recording-state recording" : "recording-state"; 
        
        let isnecessary = null; 
        if(!this.state.finalTranscript) { // 캔버스에 공이 하나라도 있으면 description이 안보이게 한다. => 원래 코드 )this.state.NumOfBall === 0
            isnecessary = "yes";
        }else {
            isnecessary = "no";
        }

        return (
            <div className="contents">
                <p>일단 Speech Recognition해서 텍스트만 번역한 상태입니다. 추후에 이 텍스트를 어떠한 기준으로 랜더링할지 결정해야합니다. </p>
                <section className="wrapper">
                    <div className="result">
                        <p className={"description " + isnecessary}>회의를 하시다보면 중요 키워드가 여기에 표시됩니다!</p>
                        {/* <canvas>
                            여기에 공들이 들어감.
                        </canvas> */}
                        
                        {/* 일단 이걸로 번역본 표기 */}
                    </div>
                    <div className="recognized-textarea">  
                        <span onDoubleClick={this.DoubleClickHandler}  className="final" id="final_span"></span>
                        <span className="interim" id="interim_span"></span>
                    </div>
                    <div className="Button-area">
                        <Button clicked={this.MeetingBtnclickHandler} btnType="mic"> 회의 시작 
                            <span className={recording_state}></span> 
                        </Button>
                        <Button clicked={this.RemoveBtnclickHandler} btnType="remove"> 위의 대본 삭제하기
                        </Button>
                    </div>
                </section>
            </div>
        )
    }
}
export default Contents;