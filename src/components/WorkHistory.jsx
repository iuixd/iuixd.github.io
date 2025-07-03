// src/components/WorkHistory.jsx
import React from 'react';
import Consultant from '../assets/Consultant.svg';
import IBMLogo from '../assets/IBMLogo.svg';
import targetLogo from '../assets/targetLogo.svg';
import imLogo from '../assets/imLogo.svg';
import ctLogo from '../assets/ctLogo.svg';
import qhLogo from '../assets/qhLogo.svg';
import dbsLogo from '../assets/dbsLogo.svg';
import fireeyeLogo from '../assets/fireeyeLogo.svg';
import mcafeeLogo from '../assets/mcafeeLogo.svg';
import aztecLogo from '../assets/aztecLogo.svg';

const jobs = [
  {
    company: 'Independent Consultant',
    role: 'UX Design Consultant',
    logo: Consultant,
    period: 'Oct 2024 to Present',
  },
  {
    company: 'IBM India Pvt Ltd',
    role: 'Senior Design Manager',
    logo: IBMLogo,
    period: 'Apr 2024 to Oct 2024',
  },
  {
    company: 'Target Corp',
    role: 'Senior UX Manager',
    logo: targetLogo,
    period: 'Aug 2022 to Apr 2023',
  },
  {
    company: 'Innominds Software Pvt Ltd',
    role: 'Senior UX Manager',
    logo: imLogo,
    period: 'Sep 2021 to Jul 2022',
  },
  {
    company: 'Stealth Startups',
    role: 'UX Design Consultant',
    logo: Consultant,
    period: 'Mar 2020 to Sep 2021',
  },
  {
    company: 'ColorTokens',
    role: 'Senior UX Architect',
    logo: ctLogo,
    period: 'Mar 2018 to Mar 2020',
  },
  {
    company: 'Quick Heal Technologies',
    role: 'Senior UX Manager',
    logo: qhLogo,
    period: 'Sep 2016 to Mar 2018',
  },
  {
    company: 'DBS Bank Singapore',
    role: 'UI UX Tech Lead Consultant',
    logo: dbsLogo,
    period: 'Aug 2015 to Aug 2016',
  },
  {
    company: 'FireEye',
    role: 'UI UX Manager',
    logo: fireeyeLogo,
    period: 'Jan 2015 to May 2015',
  },
  {
    company: 'McAfee',
    role: 'UI UX Manager',
    logo: mcafeeLogo,
    period: 'May 2006 to Jan 2015',
  },
  {
    company: 'AZTEC Software',
    role: 'Senior UI Specialist',
    logo: aztecLogo,
    period: 'Aug 2005 to May 2006',
  },
];

export default function WorkHistory() {
  return (
    <div className="flex flex-col w-full px-16 mt-12 border border-turquoise-300 border-opacity-25 rounded-lg p-6">
      <h2 className="section-title mb-4">Work</h2>
      {jobs.map(({ company, role, logo, period }, idx) => (
        <div key={idx} className="flex flex-row items-center justify-between mb-6">
          <div className="flex flex-row text-turquoise-900 text-xs-plus font-medium items-center">
            <img src={logo} className="w-8 h-8 mr-2" alt={`${company} Logo`} />
            <div className="text-xs-plus">
              <p className="font-semibold leading-tight">{company}</p>
              <p className="text-turquoise-800 leading-tight">{role}</p>
            </div>
          </div>
          <div className="text-turquoise-800 text-right text-[11px]">{period}</div>
        </div>
      ))}
    </div>
  );
}
