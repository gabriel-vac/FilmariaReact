import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={320}
    viewBox="0 0 800 320"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="176" y="0" rx="3" ry="3" width="454" height="16" />
    <rect x="6" y="265" rx="3" ry="3" width="800" height="21" />
    <circle cx="587" cy="342" r="20" />
    <rect x="0" y="29" rx="0" ry="0" width="800" height="222" />
    <rect x="138" y="97" rx="0" ry="0" width="800" height="137" />
  </ContentLoader>
)

export default MyLoader
