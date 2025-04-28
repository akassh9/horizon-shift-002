// src/app/history/page.tsx
export default function HistoryPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#bfffe1',
        backgroundImage: 'linear-gradient(to right, #c8e6c9 1px, transparent 1px), linear-gradient(to bottom, #c8e6c9 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        minHeight: '100vh'
      }}
    >
      <iframe
        title="History Publication"
        src="https://e.issuu.com/embed.html?u=uc_next_innovation_scholars&d=2023_uc_nis_future_creators_report_horizon_shift"
        style={{
          border: 'none',
          width: '100%',
          maxWidth: '800px',
          height: '80vh',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        allowFullScreen
      />
    </div>
  );
}