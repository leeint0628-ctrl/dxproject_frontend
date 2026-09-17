import { useState } from 'react';
import DailyReport from './DailyReport.jsx';
import PreferredContentPage from './PreferredContentPage.jsx';
import VoiceTrainingPage from './VoiceTrainingPage.jsx';
import { applianceUsageMock, careFeatures, customCareSettings } from './data/neulbomData.js';
import './neulbom.css';

const asset = (name) => `/assets/${name}`;

function CareIcon({ feature }) {
  return (
    <span className={`care-feature-icon care-feature-icon--${feature.iconClass}`} aria-hidden="true">
      <img src={asset(feature.icon)} alt="" />
    </span>
  );
}

function ApplianceIcon({ name }) {
  return (
    <span className={`appliance-icon appliance-icon--${name}`} aria-hidden="true">
      <span className="appliance-icon__base" />
      {name === 'on' && <span className="appliance-icon__on" />}
      {(name === 'tv' || name === 'light') && <span className="appliance-icon__tv" />}
      {name === 'light' && <span className="appliance-icon__light" />}
    </span>
  );
}

function PageHeader({ onBack }) {
  return (
    <header className="neulbom-header">
      <button type="button" className="back-button" onClick={onBack} aria-label="메뉴 화면으로 돌아가기">
        <img src={asset('nav-back.svg')} alt="" />
      </button>
      <h1>ThinQ 늘봄</h1>
    </header>
  );
}

function PageTabs({ activeTab, onChange }) {
  return (
    <div className={`page-tabs page-tabs--${activeTab}`} role="tablist" aria-label="ThinQ 늘봄 메뉴">
      <span className="page-tabs__indicator" aria-hidden="true" />
      <button
        type="button"
        className={`page-tab${activeTab === 'care' ? ' page-tab--active' : ''}`}
        role="tab"
        aria-selected={activeTab === 'care'}
        onClick={() => onChange('care')}
      >
        돌봄 관리
      </button>
      <button
        type="button"
        className={`page-tab${activeTab === 'report' ? ' page-tab--active' : ''}`}
        role="tab"
        aria-selected={activeTab === 'report'}
        onClick={() => onChange('report')}
      >
        데일리 리포트
      </button>
    </div>
  );
}

function EmergencyCard() {
  return (
    <section className="emergency-card" aria-label="긴급 알림">
      <img src={asset('alert-error.svg')} alt="" />
      <p>확인이 필요한 긴급 알림이 0건 있어요.</p>
      <div className="emergency-detail">자세히 보기</div>
    </section>
  );
}

function ManagedSummary() {
  return (
    <section className="managed-summary">
      <div className="managed-message">
        <img src={asset('managed-check.svg')} alt="" />
        <p>돌봄을 위한 제품들이 잘 관리되고 있어요.</p>
      </div>
      <div className="managed-metrics">
        <div><span>스마트 진단</span><strong>0</strong></div>
        <div><span>케어 알림</span><strong>0</strong></div>
      </div>
    </section>
  );
}

function SectionTitle({ children }) {
  return <h2 className="care-section-title">{children}</h2>;
}

function CareFeatureList() {
  return (
    <section className="care-section">
      <SectionTitle>돌봄 기능 관리</SectionTitle>
      <div className="care-feature-list">
        {careFeatures.map((feature) => (
          <div className="care-feature-card" key={feature.id}>
            <div className="care-feature-main">
              <CareIcon feature={feature} />
              <div className="care-feature-copy">
                <h3>{feature.title}</h3>
                <p>{feature.description.map((line) => <span key={line}>{line}</span>)}</p>
              </div>
            </div>
            <img className="row-chevron" src={asset('chevron-right.svg')} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}

function DeviceIdentity({ device }) {
  return (
    <div className="device-identity">
      <ApplianceIcon name={device.icon} />
      <div className="device-copy">
        <h3>{device.name}</h3>
        <div className="device-status">
          <img src={asset('status-dot.svg')} alt="" />
          <span>{device.status}</span>
        </div>
      </div>
    </div>
  );
}

function DeviceMetric({ device }) {
  return (
    <div className="device-metric">
      <span>{device.metricLabel}</span>
      <div><strong>{device.value}</strong><em>{device.unit}</em></div>
    </div>
  );
}

function DeviceHistory({ history }) {
  return (
    <div className="device-history">
      {history.map((entry) => (
        <div className="device-history-row" key={`${entry.at}-${entry.value}`}>
          <time>{entry.at}</time>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function ApplianceCard({ device, expanded, onToggle }) {
  return (
    <article className={`appliance-card${expanded ? ' appliance-card--expanded' : ''}`}>
      <button
        className="appliance-card-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`${device.id}-history`}
      >
        <div className="appliance-card-main">
          <DeviceIdentity device={device} />
          <DeviceMetric device={device} />
        </div>
        <img className="device-chevron" src={asset(expanded ? 'chevron-up.svg' : 'chevron-down.svg')} alt="" />
      </button>
      {expanded && (
        <div className="device-history-panel" id={`${device.id}-history`}>
          <div className="device-history-divider" />
          <DeviceHistory history={device.history} />
        </div>
      )}
    </article>
  );
}

function ApplianceSection({ devices }) {
  const [expandedDevices, setExpandedDevices] = useState(() => new Set());

  const toggleDevice = (id) => {
    setExpandedDevices((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="care-section">
      <SectionTitle>제품 사용 현황</SectionTitle>
      <div className="appliance-list">
        <article className="appliance-card appliance-card--hub">
          <div className="hub-content">
            <DeviceIdentity device={{ name: 'ThinQ ON', icon: 'on', status: '정상 작동 중' }} />
            <img className="hub-info" src={asset('info.svg')} alt="제품 정보" />
          </div>
        </article>
        {devices.map((device) => (
          <ApplianceCard
            key={device.id}
            device={device}
            expanded={expandedDevices.has(device.id)}
            onToggle={() => toggleDevice(device.id)}
          />
        ))}
      </div>
    </section>
  );
}

function CustomCareCard({ setting, onOpenVoice, onOpenContent }) {
  const content = (
    <>
      <span className="custom-care-icon" aria-hidden="true">
        <img src={asset(setting.icon)} alt="" />
      </span>
      <div className="custom-care-copy">
        <h3>{setting.title}</h3>
        <p>{setting.description}</p>
      </div>
      <img className="row-chevron" src={asset('chevron-right.svg')} alt="" />
    </>
  );

  const onOpen = setting.id === 'voice' ? onOpenVoice : setting.id === 'content' ? onOpenContent : null;

  if (onOpen) {
    return (
      <button type="button" className="custom-care-card custom-care-card--enabled" onClick={onOpen}>
        {content}
      </button>
    );
  }

  return <div className="custom-care-card">{content}</div>;
}

function CustomCareSection({ onOpenVoice, onOpenContent }) {
  return (
    <section className="care-section">
      <SectionTitle>맞춤 돌봄 설정</SectionTitle>
      <div className="custom-care-list">
        {customCareSettings.map((setting) => (
          <CustomCareCard
            setting={setting}
            onOpenVoice={onOpenVoice}
            onOpenContent={onOpenContent}
            key={setting.id}
          />
        ))}
      </div>
    </section>
  );
}

export default function NeulbomPage({ onBack, applianceUsage = applianceUsageMock }) {
  const [activeTab, setActiveTab] = useState('care');
  const [subPage, setSubPage] = useState('dashboard');

  if (subPage === 'voice') {
    return <VoiceTrainingPage onBack={() => setSubPage('dashboard')} />;
  }

  if (subPage === 'content') {
    return <PreferredContentPage onBack={() => setSubPage('dashboard')} />;
  }

  return (
    <div className="neulbom-page">
      <PageHeader onBack={onBack} />
      <div className="neulbom-content">
        <PageTabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === 'care' ? (
          <div className="care-content tab-panel tab-panel--care" key="care">
            <EmergencyCard />
            <ManagedSummary />
            <CareFeatureList />
            <ApplianceSection devices={applianceUsage} />
            <CustomCareSection
              onOpenVoice={() => setSubPage('voice')}
              onOpenContent={() => setSubPage('content')}
            />
          </div>
        ) : (
          <div className="tab-panel tab-panel--report" key="report">
            <DailyReport />
          </div>
        )}
      </div>
    </div>
  );
}
