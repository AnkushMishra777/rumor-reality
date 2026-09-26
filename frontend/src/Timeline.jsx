function Timeline({ events = [] }) {

  return (
    <div className="dashboard-card">

      <div className="section-heading">

        <div>
          <h2>
            Investigation Timeline
          </h2>

          <p>
            How information and price movement
            unfolded over time.
          </p>
        </div>

      </div>

      <div className="timeline">

        {events.map((event, index) => (

          <div
            className="timeline-item"
            key={index}
          >

            <div className="timeline-time">
              {event.time}
            </div>

            <div className="timeline-line">

              <div
                className={`timeline-dot ${event.type.toLowerCase()}`}
              >
                {event.type === "PRICE"
                  ? "📈"
                  : event.type === "SOCIAL"
                  ? "📱"
                  : event.type === "AI"
                  ? "🤖"
                  : "📰"}
              </div>

              {index !== events.length - 1 && (
                <div className="timeline-connector" />
              )}

            </div>

            <div className="timeline-content">

              <h3>
                {event.title}
              </h3>

              <p>
                {event.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Timeline;