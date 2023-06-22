export const HoneyIcon = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3.5L16.5 6V11L12 13.5L7.5 11V6L12 3.5Z"
        stroke={'currentColor'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11L12 13.5V18.5L7.5 21L2.99995 18.5V13.5L7.5 11Z"
        stroke={'currentColor'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 11L21 13.5V18.5L16.5 21L12 18.5V13.5L16.5 11Z"
        stroke={'currentColor'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
