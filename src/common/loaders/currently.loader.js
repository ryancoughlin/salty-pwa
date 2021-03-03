import React from 'react'
import ContentLoader from 'react-content-loader'

const CurrentlyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={418}
    height={356}
    viewBox="0 0 418 356"
    backgroundColor="#656F7A"
    foregroundColor="#7A8188"
    {...props}
  >
    <rect x="24" y="28" rx="4" ry="4" width="316" height="20" />
    <rect x="24" y="56" rx="4" ry="4" width="188" height="20" />
    <rect x="24" y="107" rx="4" ry="4" width="76" height="16" />
    <rect x="190" y="107" rx="4" ry="4" width="148" height="16" />
    <rect x="190" y="148" rx="4" ry="4" width="68" height="16" />
    <rect x="190" y="189" rx="4" ry="4" width="108" height="16" />
    <rect x="190" y="228" rx="4" ry="4" width="36" height="16" />
    <rect x="190" y="268" rx="4" ry="4" width="20" height="16" />
    <rect x="190" y="308" rx="4" ry="4" width="84" height="16" />
    <rect x="24" y="148" rx="4" ry="4" width="76" height="16" />
    <rect x="24" y="188" rx="4" ry="4" width="76" height="16" />
    <rect x="24" y="228" rx="4" ry="4" width="76" height="16" />
    <rect x="24" y="268" rx="4" ry="4" width="76" height="16" />
    <rect x="24" y="308" rx="4" ry="4" width="76" height="16" />
    <path d="M 25 135 h 390 v 1 H 25 z M 25 175 h 390 v 1 H 25 z M 25 215 h 390 v 1 H 25 z M 25 255 h 390 v 1 H 25 z M 25 295 h 390 v 1 H 25 z M 25 335 h 390 v 1 H 25 z" />
  </ContentLoader>
)

export default CurrentlyLoader
