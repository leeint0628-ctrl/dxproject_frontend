import { useEffect, useState } from 'react';
import {
  recordingScript,
  registeredVoicesMock,
  voiceSamplePhrases,
  voiceSteps,
} from './data/voiceTrainingData.js';
import './voice-training.css';

const asset = (name) => `/assets/${name}`;

function VoiceHeader({ onBack }) {
  return (
    <header className="voice-header">
      <button type="button" onClick={onBack} aria-label="이전 화면으로 돌아가기">
        <img src={asset('nav-back.svg')} alt="" />
      </button>
      <h1>맞춤 목소리</h1>
    </header>
  );
}

function VoiceOverview({ voices, onRegister }) {
  return (
    <div className="voice-overview">
      <section className="voice-intro-card">
        <div className="voice-family-image" aria-hidden="true">
          <img src={asset('voice-family.png')} alt="" />
        </div>
        <div className="voice-intro-copy">
          <h2>가족의 익숙한 목소리를 등록해<br />더욱 친근한 돌봄 환경을 만들어보세요.</h2>
          <p>목소리를 등록하면 가족의 음성으로<br />다양한 돌봄 안내를 들려드릴 수 있어요.</p>
        </div>
        <button type="button" className="voice-secondary-button" onClick={onRegister}>
          목소리 등록하기
        </button>
      </section>

      <section className="registered-voices">
        <h2>등록된 목소리</h2>
        <div className="registered-voice-list">
          {voices.map((voice, index) => (
            <div className="registered-voice-entry" key={voice.id}>
              <div className="registered-voice-row">
                <span>{voice.name}</span>
                <img src={asset('chevron-right.svg')} alt="" />
              </div>
              {index < voices.length - 1 && <div className="registered-voice-divider" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StepProgress({ activeStep }) {
  return (
    <ol className="voice-step-progress" aria-label={`목소리 등록 ${activeStep}단계`}>
      {voiceSteps.map((step) => {
        const active = step.id === activeStep;
        return (
          <li className={active ? 'voice-step voice-step--active' : 'voice-step'} key={step.id}>
            <img
              src={asset(`voice-step-${step.id}-${active ? 'active' : 'inactive'}.svg`)}
              alt={`${step.id}단계`}
            />
            <span>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function StartStep() {
  return (
    <section className="voice-start-card">
      <h2>목소리를 녹음할 준비가 되었나요?</h2>
      <div>
        <h3>원할한 목소리 학습을 위해 아래 사항을 주의해주세요.</h3>
        <ul>
          <li>조용한 곳에서 녹음해주세요.</li>
          <li>평소 말하는 목소리 톤으로 말해주세요.</li>
          <li>1분 가량의 녹음이 필요하며 천천히, 또렷하게 말해주세요.</li>
        </ul>
      </div>
    </section>
  );
}

function formatSeconds(seconds) {
  return `00:${String(seconds).padStart(2, '0')}`;
}

function AudioControl({ mode, seconds, isRecording, onToggle }) {
  const isRecordMode = mode === 'record';
  return (
    <div className="voice-audio-control">
      <button
        type="button"
        className={`voice-audio-button${isRecording ? ' voice-audio-button--recording' : ''}`}
        onClick={onToggle}
        aria-label={isRecordMode ? (isRecording ? '녹음 중지' : '녹음 시작') : '녹음본 재생'}
      >
        <img src={asset(isRecordMode ? 'voice-microphone.svg' : 'voice-play-large.svg')} alt="" />
      </button>
      <div className="voice-timer"><strong>{formatSeconds(seconds)}</strong><span>/</span><strong>01:00</strong></div>
      <p>{isRecordMode ? '1분을 넘기면 자동으로 중단돼요.' : '재생 버튼을 통해 녹음본을 확인해주세요.'}</p>
    </div>
  );
}

function RecordStep({ seconds, isRecording, onToggle }) {
  return (
    <div className="voice-record-step">
      <AudioControl mode="record" seconds={seconds} isRecording={isRecording} onToggle={onToggle} />
      <section className="voice-script-section">
        <h2>마이크 버튼을 누르고 아래 대본을 천천히 또박또박 읽어주세요.</h2>
        <div className="voice-script-card">
          {recordingScript.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
    </div>
  );
}

function ReviewStep({ seconds, onReplay, onRetry }) {
  return (
    <div className="voice-review-step">
      <AudioControl mode="play" seconds={seconds} onToggle={onReplay} />
      <section className="voice-review-card">
        <div>
          <h2>녹음이 완료되었어요.</h2>
          <p>목소리가 또렷하고 자연스럽게 들리는지 확인해주세요.<br />마음에 들지 않는 경우, 아래 버튼을 통해 다시 녹음할 수 있어요.</p>
        </div>
        <button type="button" className="voice-secondary-button" onClick={onRetry}>다시 녹음하기</button>
      </section>
    </div>
  );
}

function CompleteStep({ voiceName, onVoiceNameChange, onPreviewSample }) {
  return (
    <section className="voice-complete-card">
      <div>
        <h2>목소리 학습이 완료되었어요.</h2>
        <p>이제 등록된 목소리로 돌봄 안내를 할 수 있어요.</p>
      </div>
      <label className="voice-name-field">
        <span>목소리 이름 설정</span>
        <input
          type="text"
          value={voiceName}
          onChange={(event) => onVoiceNameChange(event.target.value)}
          placeholder="예: 딸 목소리"
          maxLength={20}
          autoComplete="off"
        />
      </label>
      <div className="voice-sample-list">
        {voiceSamplePhrases.map((phrase) => (
          <button type="button" key={phrase} onClick={() => onPreviewSample?.(phrase)}>
            <img src={asset('voice-play-small.svg')} alt="" />
            <span>{phrase}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function VoiceFlow({ onExit, onRecordingReady, onSubmitVoice, onPreviewSample, onComplete }) {
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceName, setVoiceName] = useState('');

  useEffect(() => {
    document.querySelector('.screen-scroll')?.scrollTo({ top: 0 });
  }, [step]);

  useEffect(() => {
    if (!isRecording) return undefined;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current >= 59) {
          setIsRecording(false);
          return 60;
        }
        return current + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const goBack = () => {
    setIsRecording(false);
    if (step === 1) onExit();
    else setStep((current) => current - 1);
  };

  const goNext = () => {
    if (step === 2) {
      setIsRecording(false);
      onRecordingReady?.({ durationSeconds: seconds });
    }
    if (step === 4) {
      const trimmedName = voiceName.trim();
      if (!trimmedName) return;
      const voicePayload = { durationSeconds: seconds, name: trimmedName };
      onSubmitVoice?.(voicePayload);
      onComplete?.(voicePayload);
      onExit();
      return;
    }
    setStep((current) => current + 1);
  };

  const resetRecording = () => {
    setSeconds(0);
    setIsRecording(false);
    setStep(2);
  };

  return (
    <div className="voice-flow">
      <VoiceHeader onBack={goBack} />
      <div className="voice-flow-content">
        <StepProgress activeStep={step} />
        {step === 1 && <StartStep />}
        {step === 2 && (
          <RecordStep
            seconds={seconds}
            isRecording={isRecording}
            onToggle={() => setIsRecording((current) => !current)}
          />
        )}
        {step === 3 && <ReviewStep seconds={seconds} onReplay={() => {}} onRetry={resetRecording} />}
        {step === 4 && (
          <CompleteStep
            voiceName={voiceName}
            onVoiceNameChange={setVoiceName}
            onPreviewSample={onPreviewSample}
          />
        )}
      </div>
      <div className="voice-bottom-action">
        <button type="button" onClick={goNext} disabled={step === 4 && !voiceName.trim()}>
          {step === 4 ? '목소리 저장하기' : '다음 단계로'}
        </button>
      </div>
    </div>
  );
}

export default function VoiceTrainingPage({
  onBack,
  voices = registeredVoicesMock,
  onRecordingReady,
  onSubmitVoice,
  onPreviewSample,
  onComplete,
}) {
  const [mode, setMode] = useState('overview');
  const [registeredVoices, setRegisteredVoices] = useState(voices);

  useEffect(() => {
    document.querySelector('.screen-scroll')?.scrollTo({ top: 0 });
  }, [mode]);

  if (mode === 'flow') {
    return (
      <VoiceFlow
        onExit={() => setMode('overview')}
        onRecordingReady={onRecordingReady}
        onSubmitVoice={onSubmitVoice}
        onPreviewSample={onPreviewSample}
        onComplete={(voice) => {
          setRegisteredVoices((current) => [
            ...current,
            { id: `voice-${Date.now()}`, name: voice.name },
          ]);
          onComplete?.(voice);
        }}
      />
    );
  }

  return (
    <div className="voice-page">
      <VoiceHeader onBack={onBack} />
      <VoiceOverview voices={registeredVoices} onRegister={() => setMode('flow')} />
    </div>
  );
}
