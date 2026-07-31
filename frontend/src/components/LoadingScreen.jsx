export default function LoadingScreen() {
  return (
    <div className="loading-screen" aria-label="Loading portfolio" role="status">
      <div className="loading-sidebar">
        <div className="skel skel-eyebrow" />
        <div className="skel skel-name" />
        <div className="skel skel-name skel-name-short" />
        <div className="skel skel-pitch" />
        <div className="skel skel-pitch skel-pitch-short" />
        <div className="skel skel-status" />
        <div className="skel skel-nav-item" />
        <div className="skel skel-nav-item" />
        <div className="skel skel-nav-item" />
      </div>
      <div className="loading-content">
        <div className="skel skel-heading" />
        <div className="skel skel-line" />
        <div className="skel skel-line" />
        <div className="skel skel-line skel-line-short" />
        <div className="loading-cards">
          <div className="skel skel-card" />
          <div className="skel skel-card" />
        </div>
      </div>
    </div>
  );
}
