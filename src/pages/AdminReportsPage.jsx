import React from 'react';
import './AdminPanelPage.css';

export default function AdminReportsPage(){
  return (
    <div className="adm-page" style={{padding:16}}>
      {/* Report Type */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" />
            <span>Report Type</span>
          </div>
        </div>
        <div className="adm-tabs">
          <button className="adm-tab adm-tab--active">Book Detail</button>
          <button className="adm-tab">Book Detail 2</button>
          <button className="adm-tab">Daily PL</button>
          <button className="adm-tab">Daily Report</button>
          <button className="adm-tab">Final Sheet</button>
          <button className="adm-tab">Accounts</button>
          <button className="adm-tab">Commission Report</button>
        </div>
      </section>

      {/* Report Filter */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" />
            <span>Report Filter</span>
          </div>
        </div>

        <div className="adm-block">
          <div className="adm-filter">
            {/* Start Group */}
            <div className="adm-dategroup" role="group" aria-label="Start date and time">
              <input className="seg seg--date" defaultValue="09/21/2025" aria-label="Start date" />
              <input className="seg seg--time" defaultValue="12:00" aria-label="Start time" />
              <select className="seg seg--ampm" aria-label="AM or PM" defaultValue="AM">
                <option>AM</option>
                <option>PM</option>
              </select>
              <button className="adm-cal" title="Calendar">📅</button>
            </div>

            <span className="adm-filter-sep">-</span>

            {/* End Group */}
            <div className="adm-dategroup" role="group" aria-label="End date and time">
              <input className="seg seg--date" defaultValue="09/21/2025" aria-label="End date" />
              <input className="seg seg--time" defaultValue="11:59" aria-label="End time" />
              <select className="seg seg--ampm" aria-label="AM or PM" defaultValue="PM">
                <option>AM</option>
                <option>PM</option>
              </select>
              <button className="adm-cal" title="Calendar">📅</button>
            </div>

            <button className="adm-btn-green adm-btn-submit">Submit</button>
          </div>
        </div>
      </section>

      {/* Empty space area replicating screenshot */}
      <section className="adm-card" style={{minHeight:260}}>
        <div className="adm-block" style={{color:'#64748b'}}>Welcome to Exchange</div>
      </section>
    </div>
  );
}