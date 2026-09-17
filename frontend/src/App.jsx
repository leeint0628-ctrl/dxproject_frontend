import { useState } from 'react';
import NeulbomPage from './NeulbomPage.jsx';

const asset = (name) => `/assets/${name}`;

const productManagementItems = [
  { label: '스마트 진단', icon: 'diagnosis' },
  { label: '제품 정보와 보증', icon: 'product-info' },
  { label: '제품 사용설명서', icon: 'manual' },
  { label: 'LG전자 구독', icon: 'subscription' },
];

const appItems = [
  { label: 'ThinQ 늘봄', icon: 'neulbom', enabled: true },
  { label: 'ThinQ PLAY', icon: 'play' },
  { label: '스마트 루틴', icon: 'routine' },
  { label: 'ThinQ 활용하기', icon: 'guide' },
];

function SpriteIcon({ name }) {
  return <span className={`menu-icon menu-icon--${name}`} aria-hidden="true" />;
}

function StatusBar() {
  return (
    <div className="status-bar" aria-label="상태 표시줄">
      <div className="status-time">10:00</div>
      <div className="status-levels" aria-hidden="true">
        <img src={asset('status-cellular.svg')} alt="" />
        <img src={asset('status-wifi.svg')} alt="" />
        <img className="status-battery" src={asset('status-battery.svg')} alt="" />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="app-header">
      <h1>LG ThinQ</h1>
      <div className="header-icons" aria-hidden="true">
        <img src={asset('header-plus.svg')} alt="" />
        <img src={asset('header-settings.svg')} alt="" />
      </div>
    </header>
  );
}

function QuickMenu() {
  return (
    <div className="quick-menu" aria-label="빠른 메뉴">
      <div className="quick-menu-card">
        <SpriteIcon name="mypage" />
        <span>마이페이지</span>
      </div>
      <div className="quick-menu-card">
        <SpriteIcon name="support" />
        <span>고객 지원</span>
      </div>
    </div>
  );
}

function EventCard() {
  return (
    <article className="event-card">
      <div className="event-photo" aria-hidden="true">
        <img src={asset('event-photo.png')} alt="" />
      </div>
      <div className="event-copy">
        <h2>LG전자 DX School 6기 성과발표회</h2>
        <p>6개월 간 열심히 한 나 자신 고생했습니다!</p>
        <time>2026. 04. 07. ~ 2026. 10. 02.</time>
      </div>
    </article>
  );
}

function MenuRow({ item, onNeulbom }) {
  const content = (
    <>
      <SpriteIcon name={item.icon} />
      <span>{item.label}</span>
    </>
  );

  if (item.enabled) {
    return (
      <button className="menu-row menu-row--enabled" type="button" onClick={onNeulbom}>
        {content}
      </button>
    );
  }

  return <div className="menu-row">{content}</div>;
}

function MenuSection({ title, items, onNeulbom }) {
  return (
    <section className="menu-section">
      <h2>{title}</h2>
      <div className="menu-card">
        {items.map((item, index) => (
          <div className="menu-entry" key={item.label}>
            <MenuRow item={item} onNeulbom={onNeulbom} />
            {index < items.length - 1 && <div className="menu-divider" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState('menu');

  return (
    <main className="app-shell">
      <StatusBar />
      <div className="screen-scroll" key={screen}>
        {screen === 'neulbom' ? (
          <NeulbomPage onBack={() => setScreen('menu')} />
        ) : (
          <>
            <Header />
            <div className="screen-body">
              <div className="overview">
                <QuickMenu />
                <EventCard />
              </div>
              <div className="menu-groups">
                <MenuSection title="제품 사용과 관리" items={productManagementItems} />
                <MenuSection
                  title="제품 및 앱 활용"
                  items={appItems}
                  onNeulbom={() => setScreen('neulbom')}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
