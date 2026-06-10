import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S07ContinuityMap.module.css"
import ContinuityMap from "../charts/ContinuityMap"

interface Props {
  data: ClientReportData
}

export default function S07ContinuityMap({ data }: Props) {
  const mapData = data.continuityMapData.map((d) => ({
    stage: d.stage,
    promise: d.promise,
    experience: d.experience,
    memory: d.memory,
  }))

  const strongest = data.continuityMapData.reduce((a, b) =>
    b.experience - b.promise > a.experience - a.promise ? b : a
  )
  const weakest = data.continuityMapData.reduce((a, b) =>
    b.experience - b.promise < a.experience - a.promise ? b : a
  )

  const STAGE_LABELS: Record<string, string> = {
    discovery: "Discovery", booking: "Booking", preArrival: "Pre-Arrival",
    arrival: "Arrival", room: "Room", dining: "Dining",
    facilities: "Facilities", serviceCulture: "Service Culture",
    departure: "Departure", postStay: "Post-Stay",
  }

  return (
    <section id="continuity" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>07 - Experience Continuity</p>
          <h2 className={styles.heading}>Promise. Experience. Memory.</h2>
          <p className={styles.description}>
            How closely the property delivers on what it promises - and what remains with the guest after departure.
          </p>
        </div>

        <ContinuityMap data={mapData} />

        <div className={styles.readingBox}>
          <p className={styles.readingText}>
            The experience most exceeds its promise at <strong>{STAGE_LABELS[strongest.stage]}</strong> (+{(strongest.experience - strongest.promise).toFixed(1)} points).
            The greatest gap occurs at <strong>{STAGE_LABELS[weakest.stage]}</strong>, where experience falls {Math.abs(weakest.experience - weakest.promise).toFixed(1)} points below the communicated promise.
          </p>
        </div>
      </div>
    </section>
  )
}
