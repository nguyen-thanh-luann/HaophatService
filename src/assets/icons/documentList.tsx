export const DocumentListIcon = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="20"
        y="4"
        width="4"
        height="12"
        rx="2"
        transform="rotate(90 20 4)"
        stroke={'currentColor'}
        strokeWidth="1.5"
      />
      <rect
        x="20"
        y="12"
        width="4"
        height="12"
        rx="2"
        transform="rotate(90 20 12)"
        stroke={'currentColor'}
        strokeWidth="1.5"
      />
      <rect
        x="16"
        y="8"
        width="4"
        height="12"
        rx="2"
        transform="rotate(90 16 8)"
        stroke={'currentColor'}
        strokeWidth="1.5"
      />
      <rect
        x="17"
        y="16"
        width="4"
        height="12"
        rx="2"
        transform="rotate(90 17 16)"
        stroke={'currentColor'}
        strokeWidth="1.5"
      />
    </svg>
  )
}
