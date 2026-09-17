import { dailyReportMock } from './data/dailyReportData.js';

const asset = (name) => `/assets/${name}`;

function DateSelector({ date, onDateChange }) {
  return (
    <div className="report-date-selector" aria-label="리포트 날짜">
      <button type="button" onClick={() => onDateChange?.(-1)} aria-label="이전 날짜">
        <img src={asset('date-previous.svg')} alt="" />
      </button>
      <time>{date}</time>
      <button type="button" onClick={() => onDateChange?.(1)} aria-label="다음 날짜">
        <img src={asset('date-next.svg')} alt="" />
      </button>
    </div>
  );
}

function ReportSummary({ summary }) {
  return (
    <section className="report-summary">
      <h2>오늘 하루 요약</h2>
      <p>{summary}</p>
    </section>
  );
}

function ReportChanges({ changes }) {
  return (
    <section className="report-section">
      <h2>확인할 변화</h2>
      <div className="report-change-list">
        {changes.map((change) => (
          <article className="report-change-card" key={change.id}>
            <div>
              <h3>{change.title}</h3>
              <p>{change.description}</p>
            </div>
            <img src={asset('report-chevron.svg')} alt="" />
          </article>
        ))}
      </div>
    </section>
  );
}

function MajorActivities({ activities }) {
  return (
    <section className="report-section">
      <h2>주요 생활</h2>
      <div className="major-activity-grid">
        {activities.map((activity) => (
          <article className="major-activity-card" key={activity.id}>
            <div>
              <h3>{activity.label}</h3>
              <strong>{activity.value}</strong>
            </div>
            <p className={`major-activity-comparison major-activity-comparison--${activity.tone}`}>
              {activity.comparison}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function DailyReport({ report = dailyReportMock, onDateChange, onShare }) {
  return (
    <div className="daily-report">
      <DateSelector date={report.date} onDateChange={onDateChange} />
      <ReportSummary summary={report.summary} />
      <ReportChanges changes={report.changes} />
      <MajorActivities activities={report.activities} />
      <button type="button" className="report-share-button" onClick={() => onShare?.(report)}>
        <img src={asset('share.svg')} alt="" />
        <span>공유하기</span>
      </button>
    </div>
  );
}
