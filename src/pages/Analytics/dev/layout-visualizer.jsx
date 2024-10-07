// parent has to have className "analytics-layout"

const LayoutVisualizer = function LayoutVisualizer() {
  return (
    <>
      <div className="full" style={{ background: 'rgba(255, 0, 0, 1)' }}>
        FULL
      </div>
      <div className="full-start" style={{ background: 'rgba(255, 0, 0, 0.8)' }}>
        FULL START
      </div>
      <div className="full-end" style={{ background: 'rgba(255, 0, 0, 0.6)' }}>
        FULL END
      </div>
      <div className="popout" style={{ background: 'rgba(255, 255, 0, 1)' }}>
        POPUT
      </div>
      <div className="popout-start" style={{ background: 'rgba(255, 255, 0, 0.8)' }}>
        POPUT START
      </div>
      <div className="popout-end" style={{ background: 'rgba(255, 255, 0, 0.6)' }}>
        POPUT END
      </div>
      <div className="content" style={{ background: 'rgba(0, 255, 0, 1)' }}>
        CONTENT
      </div>
      <div className="content-start" style={{ background: 'rgba(0, 255, 0, 0.8)' }}>
        CONTENT START
      </div>

      <div className="narrow" style={{ background: 'rgba(0, 255, 255, 1)' }}>
        NARROW
      </div>
      <div
        className="narrow-start"
        style={{ background: 'rgba(0, 255, 255, 0.8)', display: 'grid', placeItems: 'center' }}
      >
        NARROW START
      </div>
      <div
        className="narrow-end"
        style={{ background: 'rgba(0, 255, 255, 0.6)', display: 'grid', placeItems: 'center' }}
      >
        NARROW END
      </div>
      <div className="full-width" style={{ background: 'rgba(0, 0, 255, 1)' }}>
        FULL WIDTH
      </div>
      <div className="full-content" style={{ background: 'rgba(0, 0, 255, 0.8)' }}>
        FULL CONTENT
      </div>
      <div
        className="full-content-nopad"
        style={{
          background: 'rgba(0, 0, 255, 0.6)',
        }}
      >
        FULL CONTENT NO PAD
      </div>
    </>
  );
};

export default LayoutVisualizer;
