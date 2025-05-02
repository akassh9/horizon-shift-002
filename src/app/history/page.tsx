// src/app/history/page.tsx
export default function HistoryPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#bfffe1',
        backgroundImage:
          'linear-gradient(to right, #c8e6c9 1px, transparent 1px), ' +
          'linear-gradient(to bottom, #c8e6c9 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        minHeight: '100vh',
      }}
    >
      <iframe
        title="History Publication"
        /*  ⬇︎  document‑level link + flags  */
        src="https://issuu.com/uc_next_innovation_scholars/docs/2023_uc_nis_future_creators_report_horizon_shift?mode=window&viewMode=singlePage"
        style={{
          border: 'none',
          width: '100%',
          maxWidth: 800,
          height: '80vh',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        allowFullScreen
      />
    </div>
  );
}
