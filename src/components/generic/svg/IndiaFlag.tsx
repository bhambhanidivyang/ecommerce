export const IndiaFlag = () => {
  return (
    <>
        <svg className="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
            <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#F5F5F5" strokeWidth=".5" rx="1.75" />
            <mask id="india-flag" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#fff" strokeWidth=".5" rx="1.75" />
            </mask>
            <g mask="url(#india-flag)">
                <rect width="19.1" height="4.5" x=".25" y=".75" fill="#FF9933" />
                <rect width="19.1" height="4.5" x=".25" y="5.25" fill="#fff" />
                <rect width="19.1" height="4.5" x=".25" y="9.75" fill="#138808" />
                <circle cx="10" cy="7.5" r="1.25" fill="#000080" />
            </g>
        </svg>
    </>
  );
};