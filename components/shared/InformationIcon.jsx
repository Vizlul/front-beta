import { ColorCalc } from "@/utils/ChanceColors";


export const InformationIcon = ({chance}) => {
  return (
    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.49955 0C14.467 0 18.5 4.03301 18.5 8.99955C18.5 13.967 14.467 18 9.49955 18C4.53301 18 0.5 13.967 0.5 8.99955C0.5 4.03301 4.53301 0 9.49955 0ZM9.49955 7.2018C9.12686 7.2018 8.82438 7.50428 8.82438 7.87697V12.8282C8.82438 13.2009 9.12686 13.5034 9.49955 13.5034C9.87224 13.5034 10.1747 13.2009 10.1747 12.8282V7.87697C10.1747 7.50428 9.87224 7.2018 9.49955 7.2018ZM9.49775 4.50113C9.00083 4.50113 8.59752 4.90443 8.59752 5.40135C8.59752 5.89827 9.00083 6.30158 9.49775 6.30158C9.99467 6.30158 10.398 5.89827 10.398 5.40135C10.398 4.90443 9.99467 4.50113 9.49775 4.50113Z"
        fill={ColorCalc(chance).color}
      />
    </svg>
  );
};
